-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "tipoDePlan" TEXT NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rolId" INTEGER NOT NULL,
    "planId" INTEGER,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entrenador" (
    "id" SERIAL NOT NULL,
    "fotoPerfil" TEXT,
    "nombreCompleto" TEXT NOT NULL,
    "edad" INTEGER,
    "telefono" TEXT,
    "ciudad" TEXT,
    "pais" TEXT,
    "biografia" TEXT,
    "nivelAcademico" TEXT,
    "certificaciones" TEXT,
    "aniosExperiencia" INTEGER,
    "especialidades" TEXT,
    "documentosAdjuntos" TEXT,
    "usuarioId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Entrenador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "fotoPerfil" TEXT,
    "nombreCompleto" TEXT NOT NULL,
    "genero" TEXT,
    "edad" INTEGER,
    "correoElectronico" TEXT,
    "telefono" TEXT,
    "ciudad" TEXT,
    "pais" TEXT,
    "alturaCm" DOUBLE PRECISION,
    "pesoActualKg" DOUBLE PRECISION,
    "pesoObjetivoKg" DOUBLE PRECISION,
    "condicionesMedicas" TEXT,
    "alergias" TEXT,
    "nivelActividad" TEXT,
    "objetivoGeneral" TEXT,
    "tipoAlimentacion" TEXT,
    "alimentosPreferidos" TEXT,
    "alimentosNoPreferidos" TEXT,
    "restriccionesDieteticas" TEXT,
    "planId" INTEGER,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rutina" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rutina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ejercicio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "repeticiones" TEXT,
    "instrucciones" TEXT,
    "rutinaId" INTEGER NOT NULL,

    CONSTRAINT "Ejercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RutinasUsuario" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "rutinaId" INTEGER NOT NULL,

    CONSTRAINT "RutinasUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alimentacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alimentacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlimentacionCliente" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "alimentacionId" INTEGER NOT NULL,

    CONSTRAINT "AlimentacionCliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comida" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "hora" TEXT,
    "descripcion" TEXT NOT NULL,
    "alimentacionId" INTEGER NOT NULL,

    CONSTRAINT "Comida_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Entrenador_usuarioId_key" ON "Entrenador"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Entrenador_clienteId_key" ON "Entrenador"("clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_usuarioId_key" ON "Cliente"("usuarioId");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrenador" ADD CONSTRAINT "Entrenador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrenador" ADD CONSTRAINT "Entrenador_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ejercicio" ADD CONSTRAINT "Ejercicio_rutinaId_fkey" FOREIGN KEY ("rutinaId") REFERENCES "Rutina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RutinasUsuario" ADD CONSTRAINT "RutinasUsuario_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RutinasUsuario" ADD CONSTRAINT "RutinasUsuario_rutinaId_fkey" FOREIGN KEY ("rutinaId") REFERENCES "Rutina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlimentacionCliente" ADD CONSTRAINT "AlimentacionCliente_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlimentacionCliente" ADD CONSTRAINT "AlimentacionCliente_alimentacionId_fkey" FOREIGN KEY ("alimentacionId") REFERENCES "Alimentacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comida" ADD CONSTRAINT "Comida_alimentacionId_fkey" FOREIGN KEY ("alimentacionId") REFERENCES "Alimentacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
