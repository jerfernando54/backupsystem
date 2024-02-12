const { exec } = require('child_process');

// Comando para ejecutar la primera aplicación en el puerto 3000
const app1Command = 'npm run dev';

// Comando para ejecutar la segunda aplicación en el puerto 3200
const app2Command = 'npm run auth';

// Ejecutar la primera aplicación
const app1 = exec(app1Command);
app1.stdout.pipe(process.stdout);
app1.stderr.pipe(process.stderr);

// Ejecutar la segunda aplicación
const app2 = exec(app2Command);
app2.stdout.pipe(process.stdout);
app2.stderr.pipe(process.stderr);
