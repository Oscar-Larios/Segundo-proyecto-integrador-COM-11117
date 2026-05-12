# The Daily Chronicle
### COM 11117 · Segundo Proyecto Integrador · Primavera 2026

---

## Enlaces Principales

- **Página web:** [https://segundo-proyecto-integrador-com-111.vercel.app/](https://segundo-proyecto-integrador-com-111.vercel.app/)
- **Health endpoint:** [https://nytclone-api.onrender.com/api/health](https://nytclone-api.onrender.com/api/health)

---

## Resumen del producto

**The Daily Chronicle** es una aplicación web inspirada en el New York Times. Permite a los usuarios publicar, editar y eliminar noticias con control de autoría por sesión, y cuenta con una sección de *Trending Topics* que consume la API oficial del NYT transformada desde el backend.

Características principales:
- Frontend en **React + Vite** con diseño editorial tipográfico (Playfair Display / Source Serif 4)
- Backend en **Flask (Python)** con base de datos **PostgreSQL**
- Vista toggle entre grid de cards y listado con foto a la izquierda
- CRUD completo de artículos con control de autoría vía header `X-User`
- Consumo de la API de NYT (Top Stories) transformada en el backend
- Caché de artículos en **localStorage** con timestamp para peticiones incrementales
- **OpenGraph** implementado para compartir en redes sociales y WhatsApp
- Diseño responsivo con CSS Modules

---

## Levantar el Frontend

**Requisitos:** Node.js 18+

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

La app corre en `http://localhost:5173`

> Asegúrate de que `.env` tenga:
> ```
> VITE_API_URL=http://localhost:5000/api
> ```

---

## Levantar el Backend

**Requisitos:** Python 3.11+, PostgreSQL corriendo localmente

```bash
cd backend

# Crear y activar entorno virtual
python -m venv venv
source venv/bin/activate        # Mac/Linux
venv\Scripts\Activate.ps1       # Windows (PowerShell)

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
cp .secrets.example .secrets
```

Edita `.env`:
```
DATABASE_URL=postgresql://postgres:tu_password@localhost:5432/nytclone
FLASK_ENV=development
```

Edita `.secrets`:
```
NYT_API_KEY=tu_api_key_aquí
```

Crea la base de datos en PostgreSQL:
```sql
CREATE DATABASE nytclone;
```

Levanta el servidor:
```bash
python main.py
```

La API corre en `http://localhost:5000`

> Flask crea las tablas automáticamente al iniciar.

### requirements.txt
```
flask==3.0.3
flask-cors==4.0.1
flask-sqlalchemy==3.1.1
psycopg2-binary==2.9.10
python-dotenv==1.0.1
requests==2.31.0
gunicorn==21.2.0
```

---

## Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Health check + verificación NYT API activa |
| GET | `/api/articles?page=1&since=<ISO>` | Listado paginado |
| GET | `/api/articles/<id>` | Detalle de un artículo |
| POST | `/api/articles` | Crear (requiere header `X-User`) |
| PATCH | `/api/articles/<id>` | Editar parcialmente (solo el autor) |
| PUT | `/api/articles/<id>` | Reemplazar completo (solo el autor) |
| DELETE | `/api/articles/<id>` | Eliminar (solo el autor) |
| GET | `/api/trending` | Top Stories de NYT transformados |

---

## Autores

| Nombre |
|--------|
| Oscar Larios Mancilla |