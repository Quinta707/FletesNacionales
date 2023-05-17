GO
USE FletesNacionales


-------------------------------------------------
----------------TABLAS GENERALES-----------------
-------------------------------------------------

--*********************CARGOS*********************--
GO
CREATE OR ALTER VIEW gral.VW_tbCargos
AS
SELECT	carg_Id, 
		carg_Descripcion, 
		carg_UsuCreacion, 
		T2.user_NombreUsuario AS user_Creacion,
		carg_FechaCreacion, 
		carg_UsuModificacion, 
		T3.user_NombreUsuario AS user_Modificacion,
		carg_FechaModificacion, 
		carg_Estado
FROM gral.tbCargos AS T1 INNER JOIN acce.tbUsuarios AS T2
ON T1.carg_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios AS T3
ON T1.carg_UsuModificacion = T3.[user_Id]

--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_Insert
(@carg_Descripcion NVARCHAR(100),
 @carg_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY 
		INSERT INTO [gral].[tbCargos] (carg_Descripcion, carg_UsuCreacion, carg_UsuModificacion, carg_FechaModificacion)
		VALUES (@carg_Descripcion, @carg_UsuCreacion, NULL, NULL);

		SELECT 1 AS codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 AS codeStatus
	END CATCH
END


--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_Update
(@carg_Id INT,
 @carg_Descripcion NVARCHAR(100),
 @carg_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
		UPDATE	gral.tbCargos
		SET		carg_Descripcion = @carg_Descripcion, 
				carg_UsuModificacion = @carg_UsuModificacion, 
				carg_FechaModificacion = GETDATE()
		WHERE	carg_Id = @carg_Id

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_Delete
(@carg_Id INT)
AS
BEGIN
	BEGIN TRY
		UPDATE	gral.tbCargos
		SET		carg_Estado = 0
		WHERE	carg_Id = @carg_Id

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_Index
AS
BEGIN
	SELECT * FROM gral.VW_tbCargos
	WHERE carg_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_Find 
(@carg_Id INT)
AS
BEGIN
	SELECT * FROM gral.VW_tbCargos
	WHERE carg_Id = @carg_Id;
END



-----------------------------------------------------------------------------------------------------------------------------
--*****************DEPARTAMENTOS*******************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW gral.VW_tbDepartamentos
AS
SELECT	depa_Id, 
		depa_Nombre, 
		depa_Codigo, 
		depa_UsuCreacion, 
		T2.user_NombreUsuario AS user_Creacion,
		depa_FechaCreacion, 
		depa_UsuModificacion, 
		T3.user_NombreUsuario AS user_Modificacion,
		depa_FechaModificacion, 
		depa_Estado
FROM [gral].[tbDepartamentos] AS T1 INNER JOIN [acce].[tbUsuarios] AS T2
ON T1.depa_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios AS T3 
ON T1.depa_UsuModificacion = T3.[user_Id];


--**************  INSERT ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbDepartamentos_Insert
(@depa_Nombre NVARCHAR(100),
 @depa_UsuCreacion	INT)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM gral.tbDepartamentos WHERE depa_Nombre = @depa_Nombre AND depa_Estado = 1)
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE IF NOT EXISTS (SELECT * FROM gral.tbDepartamentos WHERE depa_Nombre = @depa_Nombre)
			BEGIN
				INSERT INTO [gral].[tbDepartamentos] (depa_Nombre, depa_Codigo, depa_UsuCreacion, depa_UsuModificacion, depa_FechaModificacion)
				VALUES (@depa_Nombre, (SELECT COUNT(depa_codigo) + 1 FROM gral.tbDepartamentos WHERE depa_Estado = 1), @depa_UsuCreacion, NULL, NULL);

				SELECT 1 codeStatus
			END
		ELSE 
			BEGIN
				UPDATE gral.tbDepartamentos
				SET depa_Nombre = @depa_Nombre, 
					depa_UsuCreacion = @depa_UsuCreacion, 
					depa_FechaCreacion = GETDATE(), 
					depa_UsuModificacion = NULL, 
					depa_FechaModificacion = NULL, 
					depa_Estado = 1
				WHERE depa_Nombre = @depa_Nombre

				SELECT 1 codeStatus
			END
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END


--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbDepartamentos_Update
(@depa_Id INT,
 @depa_Nombre NVARCHAR(100),
 @depa_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM gral.tbDepartamentos WHERE (depa_Nombre = @depa_Nombre AND depa_Id != @depa_Id))
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE
			BEGIN
				UPDATE gral.tbDepartamentos
				SET   depa_Nombre = @depa_Nombre,  
					  depa_UsuModificacion = @depa_UsuModificacion, 
					  depa_FechaModificacion = GETDATE()
				WHERE depa_Id = @depa_Id		

				SELECT 1 codeStatus
			END 
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbDepartamentos_Delete
(@depa_Id INT)
AS
BEGIN
 BEGIN TRY
	UPDATE	gral.tbDepartamentos
	SET		[depa_Estado] = 0
	WHERE	depa_Id = @depa_Id

	SELECT 1 codeStatus
 END TRY
 BEGIN CATCH
	SELECT 0 codeStatus
 END CATCH
END

--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbDepartamentos_Index
AS
BEGIN
	SELECT * FROM gral.VW_tbDepartamentos 
	WHERE depa_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbDepartamentos_Find 
(@depa_Id INT)
AS
BEGIN
	SELECT * FROM gral.VW_tbDepartamentos
	WHERE depa_Id = @depa_Id
END



-----------------------------------------------------------------------------------------------------------------------------
--******************MUNICIPIOS********************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW gral.VW_tbMunicipios
AS
SELECT	muni_Id, 
		muni_Nombre, 
		muni_Codigo, 
		T1.depa_Id, 
		T2.depa_Nombre
		muni_UsuCreacion, 
		T3.user_NombreUsuario AS user_Creacion,
		muni_FechaCreacion, 
		muni_UsuModificacion, 
		t4.user_NombreUsuario AS user_Modificacion,
		muni_FechaModificacion, 
		muni_Estado
FROM gral.tbMunicipios AS T1 INNER JOIN gral.tbDepartamentos AS T2
ON T1.depa_Id = T2.depa_Id INNER JOIN acce.tbUsuarios AS T3
ON T1.muni_UsuCreacion = t3.user_Id LEFT JOIN acce.tbUsuarios AS T4
ON T1.muni_UsuModificacion = t4.user_Id

--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMunicipios_Insert
(@muni_Nombre NVARCHAR(100),
 @muni_Codigo char(4),
 @depa_Id INT,
 @muni_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM gral.tbMunicipios WHERE muni_Codigo = @muni_Codigo AND muni_Estado = 1)
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE IF NOT EXISTS (SELECT * FROM gral.tbMunicipios WHERE muni_Codigo = @muni_Codigo)
			BEGIN
				INSERT INTO [gral].[tbMunicipios] (muni_Nombre, muni_Codigo, depa_Id, muni_UsuCreacion, muni_UsuModificacion, muni_FechaModificacion)
				VALUES (@muni_Nombre, @muni_Codigo, @depa_Id, @muni_UsuCreacion, NULL, NULL);

				SELECT 1 codeStatus
			END
		ELSE 
			BEGIN
				UPDATE gral.tbMunicipios
				SET muni_Nombre = @muni_Nombre, 
					depa_Id = @depa_Id, 
					muni_UsuCreacion = @muni_UsuCreacion, 
					muni_FechaCreacion = GETDATE(), 
					muni_UsuModificacion = NULL, 
					muni_FechaModificacion = NULL, 
					muni_Estado = 1
				WHERE muni_Codigo = @muni_Codigo
				

				SELECT 1 codeStatus
			END
	END TRY
	BEGIN CATCH
				SELECT 0 codeStatus
	END CATCH
END

--**************  UPDATE  ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMunicipios_Update
(@muni_Id INT,
 @muni_Nombre NVARCHAR(100),
 @depa_Id INT,
 @muni_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
		UPDATE gral.tbMunicipios
		SET muni_Nombre = @muni_Nombre, 
			depa_Id = @depa_Id, 
			muni_UsuModificacion = @muni_UsuModificacion, 
			muni_FechaModificacion = GETDATE()
		WHERE muni_Id = @muni_Id
		
		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE  ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMunicipios_Delete
(@muni_Id INT)
AS
BEGIN
	BEGIN TRY
		UPDATE gral.tbMunicipios
		SET muni_Estado = 0
		WHERE muni_Id = @muni_Id

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT  0 codeStatus
	END CATCH
END

--**************  INDEX  ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMunicipios_Index
AS
BEGIN
	SELECT * FROM gral.VW_tbMunicipios
	WHERE muni_Estado = 1;
END

--**************  FIND  ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMunicipios_Find 
(@muni_Id INT)
AS
BEGIN
	SELECT * FROM gral.VW_tbMunicipios
	WHERE muni_Id = @muni_Id;
END



-----------------------------------------------------------------------------------------------------------------------------
--****************ESTADOS CIVILES*****************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW gral.VW_tbEstadosCiviles
AS
SELECT	eciv_Id, 
		eciv_Descripcion,
		eciv_UsuCreacion, 
		T2.user_NombreUsuario AS user_Creacion,
		eciv_FechaCreacion, 
		eciv_UsuModificacion, 
		T3.user_NombreUsuario AS user_Modificacion,
		eciv_FechaModificacion, 
		eciv_Estado
FROM	[gral].[tbEstadosCiviles] AS T1 INNER JOIN acce.tbUsuarios AS T2
ON T1.eciv_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios AS T3
ON T1.eciv_UsuModificacion = T3.[user_Id]



--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Insert
(@eciv_Descripcion NVARCHAR(100),
 @eciv_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY 
		INSERT INTO [gral].[tbEstadosCiviles] (eciv_Descripcion, eciv_UsuCreacion, eciv_UsuModificacion, eciv_FechaModificacion)
		VALUES (@eciv_Descripcion, @eciv_UsuCreacion, NULL, NULL);

		SELECT 1 AS codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 AS codeStatus
	END CATCH
END

--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Update
(@eciv_Id INT,
 @eciv_Descripcion NVARCHAR(100),
 @eciv_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
		UPDATE	gral.tbEstadosCiviles
		SET		eciv_Descripcion = @eciv_Descripcion, 
				eciv_UsuModificacion = @eciv_UsuModificacion, 
				eciv_FechaModificacion = GETDATE()
		WHERE	eciv_Id = @eciv_Id

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Delete
(@eciv_Id INT)
AS
BEGIN
	BEGIN TRY
		UPDATE	gral.tbEstadosCiviles
		SET		eciv_Estado = 0
		WHERE	eciv_Id = @eciv_Id

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Index
AS
BEGIN
	SELECT * FROM gral.VW_tbEstadosCiviles
	WHERE eciv_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Find 
(@eciv_Id INT)
AS
BEGIN
	SELECT * FROM gral.VW_tbEstadosCiviles
	WHERE eciv_Id = @eciv_Id;
END



-----------------------------------------------------------------------------------------------------------------------------
--****************METODOS DE PAGO*****************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW gral.VW_tbMetodosdePago
AS
SELECT	meto_Id, 
		meto_Descripcion, 
		meto_UsuCreacion, 
		t2.user_NombreUsuario AS user_Creacion,
		meto_FechaCreacion, 
		meto_UsuModificacion, 
		t3.user_NombreUsuario AS user_Modificacion,
		meto_FechaModificacion, 
		meto_Estado
FROM gral.tbMetodosdePago AS T1 INNER JOIN acce.tbUsuarios AS T2
ON T1.meto_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios AS T3
ON T1.meto_UsuCreacion = T3.[user_Id]

--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMetodosdePago_Insert
(@meto_Descripcion NVARCHAR(100),
 @meto_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY 
		INSERT INTO gral.tbMetodosdePago (meto_Descripcion, meto_UsuCreacion, meto_UsuModificacion, meto_FechaModificacion)
		VALUES (@meto_Descripcion, @meto_UsuCreacion, NULL, NULL);

		SELECT 1 AS codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 AS codeStatus
	END CATCH
END

--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMetodosdePago_Update
(@meto_Id INT,
 @meto_Descripcion NVARCHAR(100),
 @meto_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY	
		UPDATE gral.tbMetodosdePago
		SET meto_Descripcion = @meto_Descripcion, 
			meto_UsuModificacion = @meto_UsuModificacion, 
			meto_FechaModificacion = GETDATE()
		WHERE meto_Id = @meto_Id

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMetodosdePago_Delete
(@meto_Id INT)
AS
BEGIN
	BEGIN TRY
		UPDATE gral.tbMetodosdePago
		SET meto_Estado = 0
		WHERE meto_Id = @meto_Id

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END


--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMetodosdePago_Index
AS
BEGIN
	SELECT * FROM gral.VW_tbMetodosdePago
	WHERE meto_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMetodosdePago_Find
(@meto_Id INT)
AS
BEGIN
	SELECT * FROM gral.VW_tbMetodosdePago
	WHERE meto_Id = @meto_Id;
END



-------------------------------------------------
------------------TABLAS EQUIPO------------------
-------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------
--*****************TIPO DE VEHICULO*******************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW equi.VW_tbTipoDeVehiculo
AS
SELECT	tipv_Id, 
		tipv_Descripcion, 
		tipv_UsuCreacion,
		t2.user_NombreUsuario AS user_Creacion, 
		tipv_FechaCreacion, 
		tipv_UsuModificacion, 
		t3.user_NombreUsuario AS user_Modificacion,
		tipv_FechaModificacion, 
		tipv_Estado
FROM	equi.tbTipoDeVehiculo AS T1 INNER JOIN acce.tbUsuarios AS T2
ON T1.tipv_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios AS T3
ON T1.tipv_UsuCreacion = T3.[user_Id]

--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbTipoDeVehiculo_Insert
(
@tipv_Descripcion NVARCHAR(100),
@tipv_UsuCreacion INT
)
AS
BEGIN
	BEGIN TRY 
		INSERT INTO equi.tbTipoDeVehiculo (tipv_Descripcion, tipv_UsuCreacion)
		VALUES	(@tipv_Descripcion, @tipv_UsuCreacion)
		SELECT 1 AS codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 AS codeStatus
	END CATCH
END 

--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbTipoDeVehiculo_Update 
(
@tipv_Id				INT,
@tipv_Descripcion		NVARCHAR(100),
@tipv_UsuModificacion	INT
)
AS
BEGIN
	BEGIN TRY	
		UPDATE	equi.tbTipoDeVehiculo
		SET		tipv_Descripcion = @tipv_Descripcion, 
				tipv_UsuModificacion = @tipv_UsuModificacion, 
				tipv_FechaModificacion = GETDATE()
		WHERE	tipv_Id = @tipv_Id

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbTipoDeVehiculo_Delete
(
@tipv_Id INT
)
AS
BEGIN
	BEGIN TRY
		UPDATE	equi.tbTipoDeVehiculo
		SET		tipv_Estado = 0
		WHERE	tipv_Id = @tipv_Id

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END


--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbTipoDeVehiculo_Index
AS
BEGIN
	SELECT	tipv_Id, 
			tipv_Descripcion, 
			tipv_UsuCreacion, 
			user_Creacion, 
			tipv_FechaCreacion, 
			tipv_UsuModificacion, 
			user_Modificacion, 
			tipv_FechaModificacion, 
			tipv_Estado
	FROM	equi.VW_tbTipoDeVehiculo
	WHERE	tipv_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbTipoDeVehiculo_Find
(
@tipv_Id INT
)
AS
BEGIN
	SELECT	tipv_Id, 
			tipv_Descripcion, 
			tipv_UsuCreacion, 
			user_Creacion, 
			tipv_FechaCreacion, 
			tipv_UsuModificacion, 
			user_Modificacion, 
			tipv_FechaModificacion, 
			tipv_Estado
	FROM	equi.VW_tbTipoDeVehiculo
	WHERE	tipv_Id = @tipv_Id;
END


-----------------------------------------------------------------------------------------------------------------------------
--***********************MARCAS***********************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW equi.VW_tbMarcas
AS
SELECT	marc_Id, 
		marc_Nombre, 
		marc_UsuCreacion, 
		t2.user_NombreUsuario AS user_Creacion, 
		marc_FechaCreacion, 
		marc_UsuModificacion, 
		t3.user_NombreUsuario AS user_Modificacion, 
		marc_FechaModificacion, 
		marc_Estado
FROM	equi.tbMarcas AS T1 INNER JOIN acce.tbUsuarios AS T2
ON T1.marc_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios AS T3
ON T1.marc_UsuCreacion = T3.[user_Id]

--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbMarcas_Insert
(
@marc_Nombre		NVARCHAR(100),
@marc_UsuCreacion	INT
)
AS
BEGIN
	BEGIN TRY 
		INSERT INTO equi.tbMarcas(marc_Nombre, marc_UsuCreacion)
		VALUES	(@marc_Nombre, @marc_UsuCreacion)
		SELECT 1 AS codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 AS codeStatus
	END CATCH
END 

--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbMarcas_Update 
(
@marc_Id				INT,
@marc_Nombre			NVARCHAR(100),
@marc_UsuModificacion	INT
)
AS
BEGIN
	BEGIN TRY	
		UPDATE	equi.tbMarcas
		SET		marc_Nombre = @marc_Nombre, 
				marc_UsuModificacion = @marc_UsuModificacion, 
				marc_FechaModificacion = GETDATE()
		WHERE	marc_Id = @marc_Id

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbMarcas_Delete
(
@marc_Id INT
)
AS
BEGIN
	BEGIN TRY
		UPDATE	equi.tbMarcas
		SET		marc_Estado = 0
		WHERE	marc_Id = @marc_Id

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END


--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbMarcas_Index
AS
BEGIN
	SELECT	marc_Id, 
			marc_Nombre, 
			marc_UsuCreacion, 
			user_Creacion, 
			marc_FechaCreacion, 
			marc_UsuModificacion, 
			user_Modificacion, 
			marc_FechaModificacion,
			marc_Estado
	FROM	equi.VW_tbMarcas
	WHERE	marc_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbMarcas_Find
(
@marc_Id INT
)
AS
BEGIN
	SELECT	marc_Id, 
			marc_Nombre, 
			marc_UsuCreacion, 
			user_Creacion, 
			marc_FechaCreacion, 
			marc_UsuModificacion, 
			user_Modificacion, 
			marc_FechaModificacion,
			marc_Estado
	FROM	equi.VW_tbMarcas
	WHERE	marc_Id = @marc_Id;
END

-----------------------------------------------------------------------------------------------------------------------------
--**********************MODELOS***********************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW equi.VW_tbModelos
AS
SELECT	mode_Id, 
		mode_Nombre, 
		T1.marc_Id,
		T4.marc_Nombre, 
		T1.tipv_Id, 
		T5.tipv_Descripcion,
		mode_UsuCreacion, 
		mode_FechaCreacion, 
		mode_UsuModificacion, 
		mode_FechaModificacion, 
		mode_Estado,
		t2.user_NombreUsuario AS user_Creacion, 
		t3.user_NombreUsuario AS user_Modificacion
FROM	equi.tbModelos AS T1 INNER JOIN acce.tbUsuarios AS T2
ON T1.mode_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios AS T3
ON T1.mode_UsuCreacion = T3.[user_Id] INNER JOIN equi.tbMarcas AS T4
ON T1.marc_Id = T4.marc_Id INNER JOIN equi.tbTipoDeVehiculo AS T5
ON T1.tipv_Id= T5.tipv_Id

--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbModelos_Insert
(
@mode_Nombre		NVARCHAR(100),
@marc_Id			INT,
@tipv_Id			INT,
@mode_UsuCreacion	INT
)
AS
BEGIN
	BEGIN TRY 
		INSERT INTO equi.tbModelos(mode_Nombre, marc_Id, tipv_Id, mode_UsuCreacion)
		VALUES	(@mode_Nombre, @marc_Id, @tipv_Id, @mode_UsuCreacion)
		SELECT 1 AS codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 AS codeStatus
	END CATCH
END 

--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbModelos_Update 
(
@mode_Id				INT,
@mode_Nombre			NVARCHAR(100),
@marc_Id				INT,
@tipv_Id				INT,
@mode_UsuModificacion	INT
)
AS
BEGIN
	BEGIN TRY	
		UPDATE	equi.tbModelos
		SET		mode_Nombre = @mode_Nombre, 
				marc_Id = @marc_Id,
				tipv_Id = @tipv_Id,
				mode_UsuModificacion = @mode_UsuModificacion, 
				mode_FechaModificacion = GETDATE()
		WHERE	mode_Id = @mode_Id

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbModelos_Delete
(
@mode_Id INT
)
AS
BEGIN
	BEGIN TRY
		UPDATE	equi.tbModelos
		SET		mode_Estado = 0
		WHERE	mode_Id = @mode_Id

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END


--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbModelos_Index
AS
BEGIN
	SELECT	mode_Id, 
			mode_Nombre, 
			marc_Id, 
			marc_Nombre, 
			tipv_Id, 
			tipv_Descripcion, 
			mode_UsuCreacion, 
			mode_FechaCreacion, 
			mode_UsuModificacion, 
			mode_FechaModificacion, 
			mode_Estado, 
			user_Creacion, 
			user_Modificacion 
	FROM	equi.VW_tbModelos
	WHERE	mode_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbModelos_Find
(
@mode_Id INT
)
AS
BEGIN
	SELECT	mode_Id, 
			mode_Nombre, 
			marc_Id, 
			marc_Nombre, 
			tipv_Id, 
			tipv_Descripcion, 
			mode_UsuCreacion, 
			mode_FechaCreacion, 
			mode_UsuModificacion, 
			mode_FechaModificacion, 
			mode_Estado, 
			user_Creacion, 
			user_Modificacion 
	FROM	equi.VW_tbModelos
	WHERE	mode_Id = @mode_Id;
END

-----------------------------------------------------------------------------------------------------------------------------
--*********************VEHICULOS**********************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW equi.VW_tbVehiculos
AS
SELECT	vehi_Id, 
		T1.mode_Id,
		T4.[mode_Nombre],
		T4.tipv_Id,
		T6.tipv_Descripcion,
		T4.[marc_Id],
		T5.marc_Nombre,
		vehi_Placa, 
		vehi_UsuCreacion, 
		vehi_FechaCreacion, 
		vehi_UsuModificacion, 
		vehi_FechaModificacion, 
		vehi_Estado,
		t2.user_NombreUsuario AS user_Creacion, 
		t3.user_NombreUsuario AS user_Modificacion
FROM	equi.tbVehiculos AS T1 INNER JOIN acce.tbUsuarios AS T2
ON T1.vehi_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios AS T3
ON T1.vehi_UsuCreacion = T3.[user_Id] INNER JOIN equi.tbModelos AS T4
ON T1.mode_Id = T4.mode_Id INNER JOIN equi.tbMarcas AS T5  
ON T4.marc_Id = T5.marc_Id INNER JOIN equi.tbTipoDeVehiculo AS T6
ON T4.tipv_Id = T6.tipv_Id

--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbVehiculos_Insert
(
@mode_Id			INT,
@vehi_Placa			NVARCHAR(MAX),
@vehi_UsuCreacion	INT
)
AS
BEGIN
	BEGIN TRY 
		INSERT INTO equi.tbVehiculos(mode_Id, vehi_Placa, vehi_UsuCreacion)
		VALUES	(@mode_Id, @vehi_Placa, @vehi_UsuCreacion)
		SELECT 1 AS codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 AS codeStatus
	END CATCH
END 

--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbVehiculos_Update 
(
@vehi_Id				INT,
@mode_Id				INT,
@vehi_Placa				NVARCHAR(MAX),
@vehi_UsuModificacion	INT
)
AS
BEGIN
	BEGIN TRY	
		UPDATE	equi.tbVehiculos
		SET		mode_Id = @mode_Id, 
				vehi_Placa = @vehi_Placa,
				vehi_UsuModificacion = @vehi_UsuModificacion, 
				vehi_FechaModificacion = GETDATE()
		WHERE	vehi_Id = @vehi_Id

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbVehiculos_Delete
(
@vehi_Id INT
)
AS
BEGIN
	BEGIN TRY
		UPDATE	equi.tbVehiculos
		SET		vehi_Estado = 0
		WHERE	vehi_Id = @vehi_Id

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END


--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbVehiculos_Index
AS
BEGIN
	SELECT	vehi_Id, 
			mode_Id, 
			mode_Nombre, 
			tipv_Id, 
			tipv_Descripcion,
			marc_Id, 
			marc_Nombre, 
			vehi_Placa, 
			vehi_UsuCreacion, 
			vehi_FechaCreacion, 
			vehi_UsuModificacion, 
			vehi_FechaModificacion, 
			vehi_Estado, 
			user_Creacion, 
			user_Modificacion
	FROM	equi.VW_tbVehiculos
	WHERE	vehi_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE equi.UDP_tbVehiculos_Find
(
@vehi_Id INT
)
AS
BEGIN
	SELECT	vehi_Id, 
			mode_Id, 
			mode_Nombre, 
			tipv_Id, 
			tipv_Descripcion,
			marc_Id, 
			marc_Nombre, 
			vehi_Placa, 
			vehi_UsuCreacion, 
			vehi_FechaCreacion, 
			vehi_UsuModificacion, 
			vehi_FechaModificacion, 
			vehi_Estado, 
			user_Creacion, 
			user_Modificacion
	FROM	equi.VW_tbVehiculos
	WHERE	vehi_Id = @vehi_Id;
END

-------------------------------------------------
-----------------TABLAS EMPRESA------------------
-------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------
--*********************CLIENTES**********************--
--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW flet.VW_tbClientes
AS
SELECT	clie_Id, 
		clie_Nombres, 
		clie_Apellidos, 
		clie_Identidad,
		clie_Nombres + ' ' +  clie_Apellidos AS clie_NombreCompleto,
		clie_FechaNacimiento, 
		clie_Sexo, 
		T1.eciv_Id, 
		T6.eciv_Descripcion,
		T1.muni_Id, 
		T4.muni_Codigo,
		T4.muni_Nombre,
		T5.depa_Id,
		T5.depa_Codigo,
		T5.depa_Nombre,
		clie_DireccionExacta, 
		clie_Telefono,
		clie_UsuCreacion, 
		T2.user_NombreUsuario AS user_Creacion,
		clie_FechaCreacion, 
		clie_UsuModificacion, 
		t3.user_NombreUsuario AS user_Modificacion,
		clie_FechaModificacion, 
		clie_Estado
FROM [flet].[tbClientes] AS T1 INNER JOIN gral.tbMunicipios AS T4 
ON T1.muni_Id = T4.muni_Id INNER JOIN gral.tbDepartamentos AS T5
ON T4.depa_Id = T5.depa_Id INNER JOIN gral.tbEstadosCiviles AS T6
ON T1.eciv_Id = T6.eciv_Id INNER JOIN [acce].[tbUsuarios] AS T2
ON T1.clie_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios AS T3 
ON T1.clie_UsuModificacion = T3.[user_Id];


--**************  INSERT ******************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbClientes_Insert
(
@clie_Nombres			NVARCHAR(200),
@clie_Apellidos			NVARCHAR(200), 
@clie_Identidad			VARCHAR(15), 
@clie_FechaNacimiento	DATE, 
@clie_Sexo				CHAR(1),
@eciv_Id				INT,
@muni_Id				INT, 
@clie_DireccionExacta	NVARCHAR(250),
@clie_Telefono			NVARCHAR(20),
@clie_UsuCreacion		INT
)
AS
BEGIN
	BEGIN TRY 
		IF EXISTS (SELECT * FROM flet.tbClientes WHERE clie_Identidad = @clie_Identidad AND clie_Estado = 1)
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE IF NOT EXISTS (SELECT * FROM flet.tbClientes WHERE clie_Identidad = @clie_Identidad)
			BEGIN
				INSERT INTO [flet].[tbClientes](clie_Nombres, clie_Apellidos, clie_Identidad, clie_FechaNacimiento, clie_Sexo, eciv_Id, muni_Id, clie_DireccionExacta, clie_Telefono, clie_UsuCreacion)
				VALUES	(@clie_Nombres, @clie_Apellidos, @clie_Identidad, @clie_FechaNacimiento, @clie_Sexo, @eciv_Id, @muni_Id, @clie_DireccionExacta, @clie_Telefono, @clie_UsuCreacion)

				SELECT 1 codeStatus
			END
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END


--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbClientes_Update
(
@clie_Id				INT,
@clie_Nombres			NVARCHAR(200),
@clie_Apellidos			NVARCHAR(200), 
@clie_Identidad			VARCHAR(15), 
@clie_FechaNacimiento	DATE, 
@clie_Sexo				CHAR(1),
@eciv_Id				INT,
@muni_Id				INT, 
@clie_DireccionExacta	NVARCHAR(250),
@clie_Telefono			NVARCHAR(20),
@clie_UsuModificacion	INT
)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM flet.tbClientes WHERE (clie_Identidad = @clie_Identidad AND clie_Id != @clie_Id))
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE
			BEGIN
				UPDATE	flet.tbClientes
				SET		clie_Nombres = @clie_Nombres, 
						clie_Apellidos = @clie_Apellidos, 
						clie_Identidad = @clie_Identidad, 
						clie_FechaNacimiento = @clie_FechaNacimiento, 
						clie_Sexo = @clie_Sexo, 
						eciv_Id = @eciv_Id, 
						muni_Id = @muni_Id, 
						clie_DireccionExacta = @clie_DireccionExacta, 
						clie_Telefono = @clie_Telefono, 
						clie_UsuModificacion = @clie_UsuModificacion, 
						clie_FechaModificacion = GETDATE()
				WHERE	clie_Id = @clie_Id		

				SELECT 1 codeStatus
			END 
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbClientes_Delete
(
@clie_Id INT
)
AS
BEGIN
 BEGIN TRY
	UPDATE	flet.tbClientes
	SET		clie_Estado = 0
	WHERE	clie_Id = @clie_Id

	SELECT 1 codeStatus
 END TRY
 BEGIN CATCH
	SELECT 0 codeStatus
 END CATCH
END

--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbClientes_Index
AS
BEGIN
	SELECT * FROM flet.VW_tbClientes 
	WHERE clie_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbClientes_Find 
(
@clie_Id INT
)
AS
BEGIN
	SELECT * FROM flet.VW_tbClientes
	WHERE clie_Id = @clie_Id
END


-----------------------------------------------------------------------------------------------------------------------------
--*********************EMPLEADOS**********************--

--************** VIEW *****************--
GO
CREATE OR ALTER VIEW flet.VW_tbEmpleados
AS
SELECT T1.[empe_Id]
      ,[empe_Nombres]
      ,[empe_Apellidos]
	  ,[empe_Nombres] + ' ' +  [empe_Apellidos] AS empe_NombreCompleto
      ,[empe_Identidad]
      ,[empe_FechaNacimiento]
      ,[empe_Sexo]
      ,T1.[eciv_Id]
	  ,T4.eciv_Descripcion
      ,T1.[muni_Id]
	  ,T5.muni_Codigo
	  ,T5.muni_Nombre
	  ,T6.depa_Id
	  ,T6.depa_Codigo
	  ,T6.depa_Nombre
      ,[empe_DireccionExacta]
      ,[empe_Telefono]
      ,T7.[sucu_Id]
	  ,T7.sucu_Nombre
      ,T8.[carg_Id]
	  ,T8.carg_Descripcion
      ,[empe_UsuCreacion]
	  ,t2.user_NombreUsuario AS user_Creacion
      ,[empe_FechaCreacion]
      ,[empe_UsuModificacion]
	  ,t3.user_NombreUsuario AS user_Modificacion
      ,[empe_FechaModificacion]
      ,[empe_Estado]
  FROM [flet].[tbEmpleados] T1 INNER JOIN gral.tbEstadosCiviles T4
  ON T4.eciv_Id = T1.eciv_Id INNER JOIN gral.tbMunicipios T5
  ON T5.muni_Id = T1.muni_Id INNER JOIN gral.tbDepartamentos T6
  ON T5.depa_Id = T6.depa_Id INNER JOIN flet.tbSucursales T7
  ON T7.sucu_Id = T1.sucu_Id INNER JOIN gral.tbCargos T8
  ON T8.carg_Id	= T1.carg_Id INNER JOIN acce.tbUsuarios T2
  ON T1.empe_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios T3
  ON T1.empe_UsuModificacion = T3.[user_Id]



--************** INDEX *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbEmpleados_Index
AS 
BEGIN
	SELECT * FROM flet.VW_tbEmpleados
	WHERE empe_Estado = 1
END


--************** FIND *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbEmpleados_Find
(@empe_Id	INT)
AS 
BEGIN
	SELECT * FROM flet.VW_tbEmpleados
	WHERE empe_Id = @empe_Id
END


--************** INSERT *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbEmpleados_Insert 
(@empe_Nombres NVARCHAR(200),
 @empe_Apellidos NVARCHAR(200),
 @empe_Identidad NVARCHAR(15),
 @empe_FechaNacimiento DATE,
 @empe_Sexo char(1),
 @eciv_Id INT,
 @muni_Id INT,
 @empe_DireccionExacta NVARCHAR(250),
 @empe_Telefono NVARCHAR(20),
 @sucu_Id INT,
 @carg_Id INT,
 @empe_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY
        
		INSERT INTO [flet].[tbEmpleados]
				([empe_Nombres]
				,[empe_Apellidos]
				,[empe_Identidad]
				,[empe_FechaNacimiento]
				,[empe_Sexo]
				,[eciv_Id]
				,[muni_Id]
				,[empe_DireccionExacta]
				,[empe_Telefono]
				,[sucu_Id]
				,[carg_Id]
				,[empe_UsuCreacion]
				,[empe_FechaCreacion]
				,[empe_UsuModificacion]
				,[empe_FechaModificacion]
				,[empe_Estado])
			VALUES
				(@empe_Nombres
				,@empe_Apellidos
				,@empe_Identidad
				,@empe_FechaNacimiento
				,@empe_Sexo
				,@eciv_Id
				,@muni_Id
				,@empe_DireccionExacta
				,@empe_Telefono
				,@sucu_Id
				,@carg_Id
				,@empe_UsuCreacion
				,GETDATE()
				,NULL
				,NULL
				,1)

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--************** UPDATE *****************--
Go
CREATE OR ALTER PROCEDURE flet.UDP_tbEmpleados_Update
(@empe_Id INT,
 @empe_Nombres NVARCHAR(200),
 @empe_Apellidos NVARCHAR(200),
 @empe_Identidad NVARCHAR(15),
 @empe_FechaNacimiento DATE,
 @empe_Sexo char(1),
 @eciv_Id INT,
 @muni_Id INT,
 @empe_DireccionExacta NVARCHAR(250),
 @empe_Telefono NVARCHAR(20),
 @sucu_Id INT,
 @carg_Id INT,
 @empe_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
      
		UPDATE [flet].[tbEmpleados]
		SET [empe_Nombres] = @empe_Nombres
			,[empe_Apellidos] = @empe_Apellidos
			,[empe_Identidad] = @empe_Identidad
			,[empe_FechaNacimiento] = @empe_FechaNacimiento
			,[empe_Sexo] = @empe_Sexo
			,[eciv_Id] = @eciv_Id
			,[muni_Id] = @muni_Id
			,[empe_DireccionExacta] = @empe_DireccionExacta
			,[empe_Telefono] = @empe_Telefono
			,[sucu_Id] = @sucu_Id
			,[carg_Id] = @carg_Id
			,[empe_UsuModificacion] =  @empe_UsuModificacion
			,[empe_FechaModificacion] = GETDATE()
		WHERE empe_Id = @empe_Id

		SELECT 1 codeStatus

	END TRY
	BEGIN CATCH
		SELECT 0  codeStatus
	END CATCH
END


--************** DELETE *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbEmpleados_Delete
(@empe_Id INT)
AS
BEGIN
	BEGIN TRY
		
		UPDATE flet.tbEmpleados
		SET empe_Estado = 0
		WHERE empe_Id = @empe_Id
		
		SELECT 1 codestatus
	
	END TRY
	BEGIN CATCH
		SELECT 0 codestatus
	END CATCH
END



-----------------------------------------------------------------------------------------------------------------------------
--***************ESCALAS POR TRAYECTO*****************--
-----------------------------------------------------------------------------------------------------------------------------
--*******************FLETE DETALLES*******************--
-----------------------------------------------------------------------------------------------------------------------------
--**********************FLETES************************--
-----------------------------------------------------------------------------------------------------------------------------
--***********************ITEMS************************--
-----------------------------------------------------------------------------------------------------------------------------
--******************PEDIDO DETALLES*******************--
-----------------------------------------------------------------------------------------------------------------------------
--**********************PEDIDOS***********************--
-----------------------------------------------------------------------------------------------------------------------------
--*********************SUCURSALES*********************--
-----------------------------------------------------------------------------------------------------------------------------
--*********************TRAYECTOS**********************--
-----------------------------------------------------------------------------------------------------------------------------
--****************UBICACION POR FLETE*****************--

