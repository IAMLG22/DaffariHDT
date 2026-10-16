# Conectar la web al panel de administración (Sanity)

Pasos que hay que hacer **una sola vez**. Se tarda unos 15 minutos.

Mientras no se completen, la web sigue funcionando con el contenido que hay en el código
(`lib/content.ts` y `lib/capataces.ts`), y `/admin` muestra el aviso «El panel aún no está conectado».

## 1. Crear el proyecto en Sanity

1. Entra en <https://www.sanity.io/manage> y crea una cuenta gratuita. Conviene usar el correo de la asociación, porque esa cuenta será la propietaria.
2. Pulsa **Create new project** y ponle de nombre «Daffari». Usa el plan gratuito (**Free**).
3. Cuando pregunte por el *dataset*, deja `production` y marca que sea **público** (*Public*).
   Público significa que cualquiera puede leer el contenido **publicado**, igual que en la web. Los borradores siguen siendo privados.
4. Copia el **Project ID**, que aparece arriba en la página del proyecto (algo como `a1b2c3d4`).

## 2. Permitir que la web abra el panel (CORS)

En sanity.io/manage → tu proyecto → **API** → **CORS origins** → **Add CORS origin**. Añade estas dos, marcando **Allow credentials** en ambas:

- `http://localhost:3000`
- `https://daffari-hdt.vercel.app`

Cuando la web pase al dominio propio, añade también ese dominio (por ejemplo `https://daffari.es`).

## 3. Poner el Project ID en la web

**En tu ordenador:** copia `.env.example` como `.env.local` y rellena:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=el-id-que-copiaste
NEXT_PUBLIC_SANITY_DATASET=production
```

**En Vercel:** proyecto `daffari-hdt` → **Settings** → **Environment Variables**. Añade esas dos mismas variables
(para *Production* y *Preview*) y después ve a **Deployments** → los tres puntos del último despliegue → **Redeploy**.

## 4. Pasar el contenido actual al panel

Así las noticias, los Capataces Ilustres (con sus fotos) y la Junta no se pierden al conectar.

1. En sanity.io/manage → **API** → **Tokens** → **Add API token**. Llámalo «migración» y dale permiso **Editor**.
2. Pégalo en `.env.local` como `SANITY_API_WRITE_TOKEN=...`. **No** lo pongas en Vercel ni lo subas a GitHub.
3. Ejecuta:

   ```
   node scripts/migrar-a-sanity.mts
   ```

4. Cuando termine, borra el token en sanity.io/manage, porque ya no hace falta.

## 5. Dar de alta al administrador

En sanity.io/manage → **Members** → **Invite members**: escribe el correo de la persona que va a publicar y elige el rol **Administrator**.
Le llegará un correo de invitación; tiene que aceptarlo y crear su contraseña, o entrar con Google.

A partir de ahí entra en **https://daffari-hdt.vercel.app/admin**. El manual para el admin está en [`docs/ADMIN.md`](ADMIN.md).

## 6. Que la web se actualice al publicar (webhook)

Sin este paso, en Vercel los listados (blog, noticias…) pueden seguir mostrando la versión antigua hasta el siguiente despliegue.

1. **Clave secreta:** está en tu `.env.local` como `SANITY_REVALIDATE_SECRET`. Si no existe, invéntate una larga (30 caracteres o más, sin espacios).
2. **En Vercel:** *Settings* → *Environment Variables* → añade `SANITY_REVALIDATE_SECRET` con esa clave. Esta sí es secreta, así que márcala como *Sensitive*. Después, **Redeploy**.
3. **En Sanity:** sanity.io/manage → tu proyecto → **API** → **Webhooks** → **Create webhook**:
   - **Name:** `Actualizar web`
   - **URL:** `https://daffari-hdt.vercel.app/api/revalidar`
   - **Dataset:** `production`
   - **Trigger on:** marca *Create*, *Update* y *Delete*
   - **Filter:** `_type in ["entradaBlog", "noticia", "homenajeado", "miembroJunta"]`
   - **Projection:** `{_type}`
   - **HTTP method:** `POST`
   - **Secret:** la misma clave del paso 1
   - Deja sin marcar *Trigger webhook when drafts are modified*
4. Guarda. Cuando la web pase al dominio propio, cambia la URL del webhook.

Para comprobarlo, publica un cambio y recarga la página en Vercel. En el webhook, la pestaña *Attempts* debe mostrar respuestas `200`.

## Cómo funciona por dentro (para programadores)

- El panel es Sanity Studio embebido en la ruta `/admin` (`app/admin/[[...tool]]`, configuración en `sanity.config.ts`).
- Los tipos de contenido están en `sanity/schemaTypes/`: entrada de blog, noticia, homenajeado y miembro de la Junta.
- La web lee los datos en `lib/datos.ts` con `cachedSanity` (`sanity/live.ts`). Todas las consultas llevan la etiqueta `sanity-contenido`. El webhook (`app/api/revalidar`) la caduca al publicar, y `<SanityLive />` refresca además las páginas que estén abiertas en ese momento.
- El Archivo Histórico (blog antiguo) sigue en `lib/archivo-blog.json`: no se edita desde el panel.
