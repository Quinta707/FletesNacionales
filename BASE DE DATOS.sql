/*
USE master
DROP DATABASE FletesNacionales
*/

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


--****************************************************--
--**********************ACCESO************************--
--****************************************************--
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
	user_Url				NVARCHAR(MAX),
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

EXEC acce.UDP_tbUsuarios_Insert 'Javier', 'Javier', 1, NULL, 1;

EXEC acce.UDP_tbUsuarios_Insert 'Sarai', 'Sarai', 1, NULL, 1;

EXEC acce.UDP_tbUsuarios_Insert 'Ian', 'Ian', 1, NULL, 1;

EXEC acce.UDP_tbUsuarios_Insert 'Daniel', 'Daniel', 1, NULL, 1;

EXEC acce.UDP_tbUsuarios_Insert 'Phynomo', 'Phynomo', 1, NULL, 1;

EXEC acce.UDP_tbUsuarios_Insert 'Javinto7', 'Javinto7', 1, NULL, 1;
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


--****************************************************--
--********************GENERALES***********************--
--****************************************************--

--********** DEPARTAMENTOS ************--
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
CONSTRAINT     PK_gral_tbEstadosCiviles_ectv_Id					   PRIMARY KEY(eciv_Id),
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
CONSTRAINT FK_gral_tbMetodosdePago_acce_tbUsuarios_meto_UsuCreacion         FOREIGN KEY(meto_UsuCreacion) REFERENCES acce.tbUsuarios(User_Id),
CONSTRAINT FK_gral_tbMetodosdePago_acce_tbUsuarios_meto_UsuModificacion     FOREIGN KEY(meto_UsuModificacion) REFERENCES acce.tbUsuarios(User_Id)
);	




--****************************************************--
--**********************EQUIPO************************--
--****************************************************--

--********** MARCAS ************--
GO
CREATE TABLE equi.tbMarcas(
marc_Id						INT IDENTITY(1,1),
marc_Nombre					NVARCHAR(100) NOT NULL,
marc_UsuCreacion			INT NOT NULL,
marc_FechaCreacion			DATETIME CONSTRAINT DF_equi_tbMarcas_marc_FechaCreacion DEFAULT(GETDATE()),
marc_UsuModificacion		INT ,
marc_FechaModificacion		DATETIME,
marc_Estado					BIT CONSTRAINT DF_equi_tbMarcas_marc_Estado DEFAULT(1)
CONSTRAINT PK_equi_tbMarcas_marc_Id                                  PRIMARY KEY(marc_Id),
CONSTRAINT FK_equi_tbMarcas_acce_tbUsuarios_marc_UsuCreacion         FOREIGN KEY(marc_UsuCreacion) REFERENCES acce.tbUsuarios(User_Id),
CONSTRAINT FK_equi_tbMarcas_acce_tbUsuarios_marc_UsuModificacion     FOREIGN KEY(marc_UsuModificacion) REFERENCES acce.tbUsuarios(User_Id)
);

--********** TIPO DE VEHICULO ************--
GO
CREATE TABLE equi.tbTipoDeVehiculo(
tipv_Id						INT IDENTITY(1,1),
tipv_Descripcion			NVARCHAR(100) NOT NULL,
tipv_UsuCreacion			INT NOT NULL,
tipv_FechaCreacion			DATETIME CONSTRAINT DF_equi_TipoDeVehiculo_tipv_FechaCreacion DEFAULT(GETDATE()),
tipv_UsuModificacion		INT ,
tipv_FechaModificacion		DATETIME,
tipv_Estado					BIT CONSTRAINT DF_equi_TipoDeVehiculo_tipv_Estado DEFAULT(1)
CONSTRAINT PK_equi_TipoDeVehiculo_tipv_Id                                  PRIMARY KEY(tipv_Id),
CONSTRAINT FK_equi_TipoDeVehiculo_acce_tbUsuarios_tipv_UsuCreacion         FOREIGN KEY(tipv_UsuCreacion) REFERENCES acce.tbUsuarios(User_Id),
CONSTRAINT FK_equi_TipoDeVehiculo_acce_tbUsuarios_tipv_UsuModificacion     FOREIGN KEY(tipv_UsuModificacion) REFERENCES acce.tbUsuarios(User_Id)
);

--************ MODELOS ************--
GO
CREATE TABLE equi.tbModelos(
mode_Id						INT IDENTITY(1,1),
mode_Nombre					NVARCHAR(100) NOT NULL,
marc_Id						INT NOT NULL,
tipv_Id						INT NOT NULL,
mode_UsuCreacion			INT NOT NULL,
mode_FechaCreacion			DATETIME CONSTRAINT DF_equi_tbModelos_mode_FechaCreacion DEFAULT(GETDATE()),
mode_UsuModificacion		INT ,
mode_FechaModificacion		DATETIME,
mode_Estado					BIT CONSTRAINT DF_equi_tbModelos_mode_Estado DEFAULT(1)
CONSTRAINT PK_equi_tbModelos_mode_Id                                  PRIMARY KEY(mode_Id),
CONSTRAINT FK_equi_tbModelos_equi_tbMarcas_marc_Id					  FOREIGN KEY(marc_Id) REFERENCES equi.tbMarcas(marc_Id),
CONSTRAINT FK_equi_tbModelos_equi_tbTipoDeVehiculo_tipv_Id			  FOREIGN KEY(tipv_Id) REFERENCES equi.tbTipoDeVehiculo(tipv_Id),
CONSTRAINT FK_equi_tbModelos_acce_tbUsuarios_mode_UsuCreacion         FOREIGN KEY(mode_UsuCreacion) REFERENCES acce.tbUsuarios(User_Id),
CONSTRAINT FK_equi_tbModelos_acce_tbUsuarios_mode_UsuModificacion     FOREIGN KEY(mode_UsuModificacion) REFERENCES acce.tbUsuarios(User_Id)
);





--****************************************************--
--**********************EMPRESA***********************--
--****************************************************--

--********** SUCURSALES ************--
GO
CREATE TABLE flet.tbSucursales(
sucu_Id							INT IDENTITY(1,1),
sucu_Nombre						NVARCHAR(200)   NOT NULL,
muni_Id							INT				NOT NULL,
sucu_Direccion					NVARCHAR(200)   NOT NULL,
sucu_UsuCreacion				INT             NOT NULL,
sucu_FechaCreacion				DATETIME        CONSTRAINT DF_flet_tbSucursales_sucu_FechaCreacion DEFAULT(GETDATE()),
sucu_UsuModificacion			INT,
sucu_FechaModificacion			DATETIME,
sucu_Estado						BIT             CONSTRAINT DF_flet_tbSucursales_sucu_Estado DEFAULT (1)
CONSTRAINT PK_flet_tbSucursales_sucu_Id                                  PRIMARY KEY(sucu_Id),
CONSTRAINT FK_flet_tbSucursales_gral_tbMunicipios_muni_Id                FOREIGN KEY(muni_Id)                 REFERENCES gral.tbMunicipios(muni_Id),
CONSTRAINT FK_flet_tbSucursales_acce_tbUsuarios_sucu_UsuCreacion         FOREIGN KEY(sucu_UsuCreacion)         REFERENCES acce.tbUsuarios(User_Id),
CONSTRAINT FK_flet_tbSucursales_acce_tbUsuarios_sucu_UsuModificacion     FOREIGN KEY(sucu_UsuModificacion)     REFERENCES acce.tbUsuarios(User_Id)
);

--********** EMPLEADOS ************--
GO
CREATE TABLE flet.tbEmpleados(
empe_Id						INT IDENTITY(1,1),
empe_Nombres				NVARCHAR(200)	NOT NULL,
empe_Apellidos				NVARCHAR(200)	NOT NULL,
empe_Identidad				NVARCHAR(15)	NOT NULL,
empe_FechaNacimiento		DATE			NOT NULL,
empe_Sexo					CHAR(1)			NOT NULL,
eciv_Id					    INT				NOT NULL,
muni_Id						INT	    		NOT NULL,
empe_DireccionExacta		NVARCHAR(250)	NOT NULL,
empe_Telefono				NVARCHAR(20)	NOT NULL,
sucu_Id						INT				NOT NULL,
carg_Id						INT				NOT NULL,
empe_UsuCreacion			INT				NOT NULL,
empe_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_pbli_tbEmpleados_empe_FechaCreacion DEFAULT(GETDATE()),
empe_UsuModificacion		INT,
empe_FechaModificacion		DATETIME,
empe_Estado					BIT				NOT NULL CONSTRAINT DF_pbli_tbEmpleados_empe_Estado DEFAULT(1),
	
CONSTRAINT PK_flet_tbEmpleados_empe_Id 										PRIMARY KEY(empe_Id),
CONSTRAINT CK_flet_tbEmpleados_empe_Sexo									CHECK(empe_sexo IN ('F', 'M')),
CONSTRAINT FK_flet_tbEmpleados_gral_tbEstadosCiviles_eciv_Id        		FOREIGN KEY(eciv_Id)					    REFERENCES gral.tbEstadosCiviles(eciv_Id),			
CONSTRAINT FK_flet_tbEmpleados_gral_tbMunicipios_muni_Id					FOREIGN KEY(muni_Id)						REFERENCES gral.tbMunicipios(muni_Id),
CONSTRAINT FK_flet_tbEmpleados_gral_tbCargos_carg_Id						FOREIGN KEY(carg_Id)						REFERENCES gral.tbCargos(carg_Id),
CONSTRAINT FK_flet_tbEmpleados_acce_tbUsuarios_empe_UsuCreacion				FOREIGN KEY(empe_UsuCreacion)				REFERENCES acce.tbUsuarios(user_Id),
CONSTRAINT FK_flet_tbEmpleados_acce_tbUsuarios_empe_UsuModificacion			FOREIGN KEY(empe_UsuModificacion)			REFERENCES acce.tbUsuarios(user_Id),
CONSTRAINT FK_flet_tbEmpleados_flet_tbSucursales_sucu_Id					FOREIGN KEY(sucu_Id)						REFERENCES flet.tbSucursales(sucu_Id)		
);

--********** CLIENTES ************--
GO
CREATE TABLE flet.tbClientes(
clie_Id						INT IDENTITY(1,1),
clie_Nombres				NVARCHAR(200)	NOT NULL,
clie_Apellidos				NVARCHAR(200)	NOT NULL,
clie_Identidad				NVARCHAR(15)	NOT NULL,
clie_FechaNacimiento		DATE			NOT NULL,
clie_Sexo					CHAR(1)			NOT NULL,
eciv_Id					    INT				NOT NULL,
muni_Id						INT	    		NOT NULL,
clie_DireccionExacta		NVARCHAR(250)	NOT NULL,
clie_Telefono				NVARCHAR(20)	NOT NULL,
clie_UsuCreacion			INT				NOT NULL,
clie_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_pbli_tbClientes_clie_FechaCreacion DEFAULT(GETDATE()),
clie_UsuModificacion		INT,
clie_FechaModificacion		DATETIME,
clie_Estado					BIT				NOT NULL CONSTRAINT DF_pbli_tbClientes_clie_Estado DEFAULT(1),
	
CONSTRAINT PK_flet_tbClientes_clie_Id 										PRIMARY KEY(clie_Id),
CONSTRAINT CK_flet_tbClientes_clie_Sexo										CHECK(clie_sexo IN ('F', 'M')),
CONSTRAINT FK_flet_tbClientes_gral_tbEstadosCiviles_eciv_Id        			FOREIGN KEY(eciv_Id)					    REFERENCES gral.tbEstadosCiviles(eciv_Id),			
CONSTRAINT FK_flet_tbClientes_gral_tbMunicipios_muni_Id						FOREIGN KEY(muni_Id)						REFERENCES gral.tbMunicipios(muni_Id),
CONSTRAINT FK_flet_tbClientes_acce_tbUsuarios_UserCreate					FOREIGN KEY(clie_UsuCreacion)				REFERENCES acce.tbUsuarios(user_Id),
CONSTRAINT FK_flet_tbClientes_acce_tbUsuarios_UserUpdate					FOREIGN KEY(clie_UsuModificacion)			REFERENCES acce.tbUsuarios(user_Id),	
);	

--********** ITEMS ************--
GO
CREATE TABLE flet.tbItems(
item_Id						INT IDENTITY(1,1),
item_Nombre					NVARCHAR(100) NOT NULL,
item_Descripcion			NVARCHAR(100) NOT NULL,
item_Peso					DECIMAL(18,2) NOT NULL, --En kilogramos(?
item_Volumen				DECIMAL(18,2) NOT NULL,
item_UsuCreacion			INT NOT NULL,
item_FechaCreacion			DATETIME CONSTRAINT DF_equi_tbModelos_mode_FechaCreacion DEFAULT(GETDATE()),
item_UsuModificacion		INT ,
item_FechaModificacion		DATETIME,
item_Estado					BIT CONSTRAINT DF_equi_tbModelos_mode_Estado DEFAULT(1)
CONSTRAINT PK_flet_tbItems_item_Id                                  PRIMARY KEY(item_Id),
CONSTRAINT FK_flet_tbItems_acce_tbUsuarios_item_UsuCreacion         FOREIGN KEY(item_UsuCreacion) REFERENCES acce.tbUsuarios(User_Id),
CONSTRAINT FK_flet_tbItems_acce_tbUsuarios_item_UsuModificacion     FOREIGN KEY(item_UsuModificacion) REFERENCES acce.tbUsuarios(User_Id)
);


--********** PEDIDOS ************--



--********** PEDIDOS DETALLE ************--

--********** FLETES ************--

--********** FLETES DETALLE ************--

--********** TRAYECTOS ************--

--********** ESCALAS POR TRAYECTO ************--

--********** UBICACION POR FLETE ************--


-----------------SOLO TABLAS-----------------

------------------GENERALES-----------------
--Departamento ✓
--Municipio ✓
--Estados Civiles ✓
--Métodos de Pago ✓
--Cargos ✓

------------------EQUIPO---------------------
--Modelos ✓
--Marcas ✓
--Vehiculos ✓
--Tipo de vehiculo ✓

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
--Roles ✓
--RolesPorPantalla 
--Pantallas ✓maomeno
--Usuarios ✓