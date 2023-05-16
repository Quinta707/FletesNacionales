CREATE DATABASE FletesNacionales
GO
USE FletesNacionales
GO
CREATE SCHEMA acce
GO
CREATE SCHEMA gral
GO
CREATE SCHEMA equi
GO
CREATE SCHEMA flet
GO
CREATE SCHEMA acce
GO

CREATE TABLE acce.tbRoles(
	role_Id					INT IDENTITY,
	role_Nombre				NVARCHAR(100) UNIQUE NOT NULL,
	role_UsuCreacion		INT NOT NULL,
	role_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_role_FechaCreacion DEFAULT(GETDATE()),
	role_UsuModificacion	INT,
	role_FechaModificacion	DATETIME,
	role_Estado				BIT NOT NULL CONSTRAINT DF_role_Estado DEFAULT(1)
	CONSTRAINT PK_acce_tbRoles_role_Id PRIMARY KEY(role_Id)
);
GO

CREATE TABLE acce.tbPantallas(
	pant_Id					INT IDENTITY,
	pant_Nombre				NVARCHAR(100) NOT NULL,
	pant_Url				NVARCHAR(300) NOT NULL,
	pant_Menu				NVARCHAR(300) NOT NULL,
	pant_Icono				NVARCHAR(300) NOT NULL,
	pant_reactId			NVARCHAR(80) NOT NULL,
	pant_UsuCreacion		INT NOT NULL,
	pant_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_pant_FechaCreacion DEFAULT(GETDATE()),
	pant_UsuModificacion	INT,
	pant_FechaModificacion	DATETIME,
	pant_Estado				BIT NOT NULL CONSTRAINT DF_pant_Estado DEFAULT(1)
	CONSTRAINT PK_acce_tbPantallas_pant_Id PRIMARY KEY(pant_Id)
);
GO

CREATE TABLE acce.tbPantallasPorRoles(
	prol_Id						INT IDENTITY,
	role_Id						INT NOT NULL,
	pant_Id						INT NOT NULL,
	prol_UsuCreacion			INT NOT NULL,
	prol_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_pantrole_FechaCreacion DEFAULT(GETDATE()),
	prol_UsuModificacion		INT,
	prol_FechaModificacion		DATETIME,
	prol_Estado					BIT NOT NULL CONSTRAINT DF_pantrole_Estado DEFAULT(1)
	CONSTRAINT FK_acce_tbPantallasPorRoles_acce_tbRoles_role_Id FOREIGN KEY(role_Id) REFERENCES acce.tbRoles(role_Id),
	CONSTRAINT FK_acce_tbPantallasPorRoles_acce_tbPantallas_pant_Id FOREIGN KEY(pant_Id)	REFERENCES acce.tbPantallas(pant_Id),
	CONSTRAINT PK_acce_tbPantallasPorRoles_pantrole_Id PRIMARY KEY(prol_Id)
);
GO

CREATE TABLE acce.tbUsuarios(
	user_Id 				INT IDENTITY(1,1),
	user_NombreUsuario		NVARCHAR(100) NOT NULL,
	user_Contrasena			NVARCHAR(MAX) NOT NULL,
	user_EsAdmin			BIT,
	role_Id					INT,
	empe_Id					INT,
	user_UsuCreacion		INT NOT NULL,
	user_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_user_FechaCreacion DEFAULT(GETDATE()),
	user_UsuModificacion	INT,
	user_FechaModificacion	DATETIME,
	user_Estado				BIT NOT NULL CONSTRAINT DF_user_Estado DEFAULT(1)
	CONSTRAINT PK_acce_tbUsuarios_user_Id  PRIMARY KEY(user_Id),
);
GO

CREATE OR ALTER PROCEDURE acce.UDP_tbUsuarios_Insert
	@user_NombreUsuario NVARCHAR(100),	
    @user_Contrasena NVARCHAR(200),
	@user_EsAdmin BIT,					
    @role_Id INT, 
	@empe_Id INT										
AS
BEGIN
	DECLARE @password NVARCHAR(MAX)=(SELECT HASHBYTES('Sha2_512', @user_Contrasena));

	INSERT acce.tbUsuarios(user_NombreUsuario, user_Contrasena, user_EsAdmin, role_Id, empe_Id, user_UsuCreacion)
	VALUES(@user_NombreUsuario, @password, @user_EsAdmin, @role_Id, @empe_Id, 1);
END;
GO

EXEC acce.UDP_tbUsuarios_Insert 'Admin', '123', 1, NULL, 1;
GO

GO
ALTER TABLE acce.tbRoles
ADD CONSTRAINT FK_acce_tbRoles_acce_tbUsuarios_role_UsuCreacion_user_Id 	FOREIGN KEY(role_UsuCreacion) REFERENCES acce.tbUsuarios(user_Id),
	CONSTRAINT FK_acce_tbRoles_acce_tbUsuarios_role_UsuModificacion_user_Id FOREIGN KEY(role_UsuModificacion) REFERENCES acce.tbUsuarios(user_Id);

GO
INSERT INTO acce.tbRoles(role_Nombre, role_UsuCreacion)
VALUES	('Acceso', 1);


GO
UPDATE acce.tbUsuarios
SET role_Id = 1
WHERE user_Id = 1;

GO
ALTER TABLE [acce].[tbUsuarios]
ADD CONSTRAINT FK_acce_tbUsuarios_acce_tbUsuarios_user_UsuCreacion_user_Id  FOREIGN KEY(user_UsuCreacion) REFERENCES acce.tbUsuarios([user_Id]),
	CONSTRAINT FK_acce_tbUsuarios_acce_tbUsuarios_user_UsuModificacion_user_Id  FOREIGN KEY(user_UsuModificacion) REFERENCES acce.tbUsuarios([user_Id]),
	CONSTRAINT FK_acce_tbUsuarios_acce_tbRoles_role_Id FOREIGN KEY(role_Id) REFERENCES acce.tbRoles(role_Id)

GO 
ALTER TABLE [acce].[tbPantallasPorRoles]
ADD CONSTRAINT FK_acce_tbPantallasPorRoles_acce_tbUsuarios_pantrole_UsuCreacion_user_Id FOREIGN KEY([prol_UsuCreacion]) REFERENCES acce.tbUsuarios([user_Id]),
	CONSTRAINT FK_acce_tbPantallasPorRoles_acce_tbUsuarios_pantrole_UsuModificacion_user_Id FOREIGN KEY([prol_UsuModificacion]) REFERENCES acce.tbUsuarios([user_Id])

GO
CREATE TABLE [gral].[tbDepartamentos](
    depa_Id                     INT IDENTITY(1,1),
	depa_Nombre 				NVARCHAR(100) NOT NULL,
	depa_Codigo  				CHAR(2) NOT NULL,
	depa_UsuCreacion			INT NOT NULL,
	depa_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_depa_FechaCreacion DEFAULT(GETDATE()),
	depa_UsuModificacion		INT,
	depa_FechaModificacion		DATETIME,
	depa_Estado					BIT NOT NULL CONSTRAINT DF_depa_Estado DEFAULT(1)
	CONSTRAINT PK_gral_tbDepartamentos_depa_Id 									PRIMARY KEY(depa_Id),
	CONSTRAINT FK_gral_tbDepartamentos_acce_tbUsuarios_depa_UsuCreacion_user_Id  		FOREIGN KEY(depa_UsuCreacion) 		REFERENCES acce.tbUsuarios(user_Id),
	CONSTRAINT FK_gral_tbDepartamentos_acce_tbUsuarios_depa_UsuModificacion_user_Id  	FOREIGN KEY(depa_UsuModificacion) 	REFERENCES acce.tbUsuarios(user_Id)
);


--********TABLA MUNICIPIO****************---
GO
CREATE TABLE gral.tbMunicipios(
	muni_Id                 INT IDENTITY(1,1),
    muni_Nombre				NVARCHAR(80) NOT NULL,
	muni_Codigo				CHAR(4)	NOT NULL,
	depa_Id					INT	NOT NULL,
	muni_UsuCreacion		INT	NOT NULL,
	muni_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_muni_FechaCreacion DEFAULT(GETDATE()),
	muni_UsuModificacion	INT,
	muni_FechaModificacion	DATETIME,
	muni_Estado				BIT	NOT NULL CONSTRAINT DF_muni_Estado DEFAULT(1)
	CONSTRAINT PK_gral_tbMunicipios_muni_Id 										PRIMARY KEY(muni_Id),
	CONSTRAINT FK_gral_tbMunicipios_gral_tbDepartamentos_depa_Id 					FOREIGN KEY (depa_Id) 						REFERENCES gral.tbDepartamentos(depa_Id),
	CONSTRAINT FK_gral_tbMunicipios_acce_tbUsuarios_muni_UsuCreacion_user_Id  		FOREIGN KEY(muni_UsuCreacion) 				REFERENCES acce.tbUsuarios(user_Id),
	CONSTRAINT FK_gral_tbMunicipios_acce_tbUsuarios_muni_UsuModificacion_user_Id  	FOREIGN KEY(muni_UsuModificacion) 			REFERENCES acce.tbUsuarios(user_Id)
);


--********* ESTADOS CIVILES ***************--
GO
CREATE TABLE gral.tbEstadosCiviles(
eciv_Id							INT IdENTITY(1,1),
eciv_Descripcion				VARCHAR(100),
eciv_UsuCreacion				INT NOT NULL,
eciv_FechaCreacion				DATETIME NOT NULL CONSTRAINT DF_gral_TbEstadosCiviles_eciv_FechaCreacion    DEFAULT(GETDATE()),
eciv_UsuModificacion			INT,
eciv_FechaModificacion			DATETIME,
eciv_Estado						BIT NOT NULL CONSTRAINT DF_gral_TbEstadosCiviles_eciv_Estado    DEFAULT(1)
CONSTRAINT     PK_gral_tbEstadosCiviles_ectv_Id PRIMARY KEY(eciv_Id),
CONSTRAINT     FK_gral_tbEstadosCiviles_UsuCreacion_usua_Id        FOREIGN KEY(eciv_UsuCreacion) REFERENCES acce.tbUsuarios(user_Id),
CONSTRAINT     FK_gral_tbEstadosCiviles_UsuModificacion_usua_Id    FOREIGN KEY(eciv_UsuModificacion) REFERENCES acce.tbUsuarios(user_Id)
);


--********** CARGOS ************--
GO
CREATE TABLE gral.tbCargos(
carg_Id INT IDENTITY(1,1),
carg_Descripcion			NVARCHAR(100) NOT NULL,
carg_UsuCreacion			INT NOT NULL,
carg_FechaCreacion			DATETIME CONSTRAINT DF_gral_tbCargos_carg_FechaCreacion DEFAULT(GETDATE()),
carg_UsuModificacion		INT ,
carg_FechaModificacion		DATETIME,
carg_Estado					BIT CONSTRAINT DF_gral_tbCargos_carg_Estado DEFAULT(1)
CONSTRAINT PK_gral_tbcargos_carg_Id                                  PRIMARY KEY(carg_Id),
CONSTRAINT PK_gral_tbCargos_acce_tbUsuarios_carg_UsuCreacion         FOREIGN KEY(carg_UsuCreacion) REFERENCES acce.tbUsuarios(User_Id),
CONSTRAINT PK_gral_tbCargos_acce_tbUsuarios_carg_UsuModificacion     FOREIGN KEY(carg_UsuModificacion) REFERENCES acce.tbUsuarios(User_Id)
);

--********** METODOS DE PAGO ************--
GO 
CREATE TABLE gral.tbMetodosdePago(
meto_Id						INT IDENTITY(1,1),
meto_Descripcion			NVARCHAR(100),
meto_UsuCreacion			INT NOT NULL,
meto_FechaCreacion			DATETIME CONSTRAINT DF_gral_tbMetodosdePago_meto_FechaCreacion DEFAULT(GETDATE()),
meto_UsuModificacion		INT ,
meto_FechaModificacion		DATETIME,
meto_Estado					BIT CONSTRAINT DF_gral_tbMetodosdePago_meto_Estado DEFAULT(1)
CONSTRAINT PK_gral_tbMetodosdePago_meto_Id                                  PRIMARY KEY(meto_Id ),
CONSTRAINT PK_gral_tbMetodosdePago_acce_tbUsuarios_meto_UsuCreacion         FOREIGN KEY(meto_UsuCreacion) REFERENCES acce.tbUsuarios(User_Id),
CONSTRAINT PK_gral_tbMetodosdePago_acce_tbUsuarios_meto_UsuModificacion     FOREIGN KEY(meto_UsuModificacion) REFERENCES acce.tbUsuarios(User_Id)
);	


-----------------SOLO TABLAS-----------------

------------------GENERALES-----------------
--Departamento ✓
--Municipio ✓
--Estados Civiles ✓
--Métodos de Pago ✓
--Cargos ✓

------------------EQUIPO---------------------
--Modelos
--Marcas
--Vehiculos
--Tipo de vehiculo

------------------Empresa--------------------
--Empleados
--Clientes
--Sucursales
--Items
--Pedidos
--PedidosDetalles
--Fletes
--Flete detalle
--Trayectos
--EscalasPorTrayecto
--Ubicacion por flete

------------------ACCESO--------------------
--Roles ✓
--RolesPorPantalla ✓
--Pantallas ✓
--Usuarios ✓



----------------SOLO INSERTS-----------------

------------------GENERALES-----------------
--Departamento ✓
--Municipio ✓
--Estados Civiles ✓
--Métodos de Pago ✓
--Cargos ✓

------------------EQUIPO---------------------
--Modelos
--Marcas
--Vehiculos
--Tipo de vehiculo

------------------Empresa--------------------
--Empleados
--Clientes
--Sucursales
--Items
--Pedidos
--PedidosDetalles
--Fletes
--Flete detalle
--Trayectos
--EscalasPorTrayecto
--Ubicacion por flete

------------------ACCESO--------------------
--Roles 
--RolesPorPantalla 
--Pantallas 
--Usuarios ✓