require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');

// Importar las rutas de la API
const alimentacionRoutes = require('./routes/alimentacion');
const busquedaRoutes = require('./routes/busqueda');
const rutinasRoutes = require('./routes/rutinas');
const userRoutes = require('./routes/user');
const entrenamientoRoutes = require('./routes/entrenamiento');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARE ---
// Parsear JSON en las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para manejar sesiones
app.use(session({
  secret: 'nutrifit-secret-key', // Clave secreta para firmar la cookie de sesión
  resave: false,
  saveUninitialized: false
}));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));


// --- RUTAS DE LAS VISTAS (FRONTEND) ---
// Servir el index.html principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Servir la vista del módulo de alimentación
app.get('/alimentacion', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'alimentacion.html'));
});

// Servir la vista del módulo de búsqueda de ejercicios
app.get('/busqueda', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'busqueda.html'));
});

// Servir la vista del módulo de rutinas de entrenamiento
app.get('/rutinas', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'rutinas.html'));
});

// Servir la vista del módulo de entrenamiento
app.get('/entrenamiento', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'entrenamiento.html'));
});


// Servir la vista del módulo de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Servir la vista del módulo de registro
app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registro.html'));
});

// Servir la vista de cambiar contraseña
app.get('/cambiar-contrasena', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cambiar-contrasena.html'));
});

// Servir la vista de confirmación exitosa
app.get('/confirmacion-exitosa', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'confirmacion-exitosa.html'));
});

// Servir la vista de recuperar contraseña
app.get('/recuperar-contrasena', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'recuperar-contrasena.html'));
});

// Servir la vista de recuperar usuario
app.get('/recuperar-usuario', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'recuperar-usuario.html'));
});

// Servir la vista de resetear contraseña
app.get('/resetear-contrasena', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'resetear-contrasena.html'));
});

// Servir la vista del dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// Servir la vista del perfil
app.get('/perfil', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'perfil.html'));
});

// Ruta para obtener los datos de la sesión
app.get('/session', (req, res) => {
  if (req.session.userId) {
    // Si la sesión existe, devolver los datos de la sesión
    res.json({
      userName: req.session.userName,
      userEmail: req.session.userEmail
    });
  } else {
    // Si no hay sesión activa, devolver un error
    res.json({ error: 'No estás logueado' });
  }
});

// ✅ Ruta para mostrar página de confirmación de contraseña cambiada
app.get('/confirmacion-cambio', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'confirmacion-cambio.html'));
});


// --- RUTAS DE LA API (BACKEND) ---
app.use('/api/alimentacion', alimentacionRoutes);
app.use('/api/busqueda', busquedaRoutes);
app.use('/api/rutinas', rutinasRoutes);
app.use('/api/user', userRoutes);
app.use('/api/entrenamiento', entrenamientoRoutes);
app.use('/api/auth', authRoutes);


// --- MANEJO DE ERRORES ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor!');
});

// --- INICIAR SERVIDOR ---
app.listen(PORT, () => {
    console.log(`🚀 Servidor unificado de NutriFit corriendo en http://localhost:${PORT}`);
});
