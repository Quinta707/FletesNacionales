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
		carg_Habilitado,
		CASE
			WHEN carg_Habilitado = 1 THEN 'Habilitado'
			WHEN carg_Habilitado = 0 THEN 'Deshabilitado'
			ELSE 'error'
		END AS carg_Visible,
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
		depa_Habilitado,
		CASE
			WHEN depa_Habilitado = 1 THEN 'Habilitado'
			WHEN depa_Habilitado = 0 THEN 'Deshabilitado'
			ELSE 'error'
		END AS depa_Visible,
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
		muni_Habilitado,
		CASE
			WHEN muni_Habilitado = 1 THEN 'Habilitado'
			WHEN muni_Habilitado = 0 THEN 'Deshabilitado'
			ELSE 'error'
		END AS muni_Visible,
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
		eciv_Habilitado,
		CASE
			WHEN eciv_Habilitado = 1 THEN 'Habilitado'
			WHEN eciv_Habilitado = 0 THEN 'Deshabilitado'
			ELSE 'error'
		END AS eciv_Visible,
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
		meto_Habilitado,
		CASE
			WHEN meto_Habilitado = 1 THEN 'Habilitado'
			WHEN meto_Habilitado = 0 THEN 'Deshabilitado'
			ELSE 'error'
		END AS meto_Visible,
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
		tipv_Habilitado,
		CASE
			WHEN tipv_Habilitado = 1 THEN 'Habilitado'
			WHEN tipv_Habilitado = 0 THEN 'Deshabilitado'
			ELSE 'error'
		END AS tipv_Visible,
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
		marc_Habilitado,
		CASE
			WHEN marc_Habilitado = 1 THEN 'Habilitado'
			WHEN marc_Habilitado = 0 THEN 'Deshabilitado'
			ELSE 'error'
		END AS marc_Visible,
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
		mode_Habilitado,
		CASE
			WHEN mode_Habilitado = 1 THEN 'Habilitado'
			WHEN mode_Habilitado = 0 THEN 'Deshabilitado'
			ELSE 'error'
		END AS mode_Visible,
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
		vehi_PesoMaximo,
		vehi_VolumenMaximo,
		T4.tipv_Id,
		T6.tipv_Descripcion,
		T4.[marc_Id],
		T5.marc_Nombre,
		vehi_Placa, 
		vehi_EnUso,
		CASE
			WHEN vehi_EnUso = 1 THEN 'Si'
			WHEN vehi_EnUso = 0 THEN 'No'
			ELSE 'error'
		END AS vehi_Usado,
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
@vehi_PesoMaximo	DECIMAL(18,2),
@vehi_VolumenMaximo	DECIMAL(18,2),
@vehi_Placa			NVARCHAR(MAX),
@vehi_UsuCreacion	INT
)
AS
BEGIN
	BEGIN TRY 
		INSERT INTO equi.tbVehiculos(mode_Id, vehi_PesoMaximo, vehi_VolumenMaximo, vehi_Placa, vehi_UsuCreacion)
		VALUES	(@mode_Id, @vehi_PesoMaximo, @vehi_VolumenMaximo, @vehi_Placa, @vehi_UsuCreacion)
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
@vehi_PesoMaximo		DECIMAL(18,2),
@vehi_VolumenMaximo		DECIMAL(18,2),
@vehi_Placa				NVARCHAR(MAX),
@vehi_UsuModificacion	INT
)
AS
BEGIN
	BEGIN TRY	
		UPDATE	equi.tbVehiculos
		SET		mode_Id = @mode_Id, 
				vehi_PesoMaximo = @vehi_PesoMaximo,
				vehi_VolumenMaximo = @vehi_VolumenMaximo,
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
		clie_Habilitado,
		CASE
			WHEN clie_Habilitado = 1 THEN 'Habilitado'
			WHEN clie_Habilitado = 0 THEN 'Deshabilitado'
			ELSE 'error'
		END AS clie_Visible,
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
	  ,empe_Habilitado,
		CASE
			WHEN empe_Habilitado = 1 THEN 'Habilitado'
			WHEN empe_Habilitado = 0 THEN 'Deshabilitado'
			ELSE 'error'
		END AS empe_Visible
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

--************** VIEW *****************--
GO
CREATE OR ALTER VIEW flet.VW_tbEscalasPorTrayecto
AS
SELECT	estr_Id, 
		flet_Id, 
		muni_Escala,
		muni_Nombre,
		T4.depa_Id,
		depa_Nombre,
		estr_UsuCreacion, 
		estr_FechaCreacion, 
		estr_UsuModificacion, 
		estr_FechaModificacion, 
		estr_Estado,
		t2.user_NombreUsuario AS user_Creacion,
		t3.user_NombreUsuario AS user_Modificacion
  FROM flet.tbEscalasPorTrayecto T1 INNER JOIN acce.tbUsuarios T2
  ON T1.estr_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios T3
  ON T1.estr_UsuModificacion = T3.[user_Id] INNER JOIN gral.tbMunicipios T4
  ON T1.muni_Escala = T4.muni_Id INNER JOIN gral.tbDepartamentos T5
  ON T4.depa_Id = T5.depa_Id



--************** INDEX *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbEscalasPorTrayecto_Index
AS 
BEGIN
	SELECT * FROM flet.VW_tbEscalasPorTrayecto
	WHERE estr_Estado = 1
END


--************** FIND *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbEscalasPorTrayecto_Find
(
@estr_Id	INT
)
AS 
BEGIN
	SELECT * FROM flet.VW_tbEscalasPorTrayecto
	WHERE estr_Id = @estr_Id
END


--************** INSERT *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbEscalasPorTrayecto_Insert 
(
@flet_Id			INT,
@muni_Escala		INT,
@estr_UsuCreacion	INT
)
AS
BEGIN
	BEGIN TRY
        
		INSERT INTO flet.tbEscalasPorTrayecto (flet_Id, muni_Escala, estr_UsuCreacion)
		VALUES	(@flet_Id, @muni_Escala, @estr_UsuCreacion)

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--************** UPDATE *****************--
Go
CREATE OR ALTER PROCEDURE flet.UDP_tbEscalasPorTrayecto_Update
(
@estr_Id				INT,
@flet_Id				INT,
@muni_Escala			INT,
@estr_UsuModificacion	INT
 )
AS
BEGIN
	BEGIN TRY
      
		UPDATE	flet.tbEscalasPorTrayecto
		SET		flet_Id = @flet_Id,
				muni_Escala  = @muni_Escala,
				estr_UsuModificacion = @estr_UsuModificacion,
				estr_FechaModificacion = GETDATE()
		WHERE	estr_Id = @estr_Id

		SELECT 1 codeStatus

	END TRY
	BEGIN CATCH
		SELECT 0  codeStatus
	END CATCH
END


--************** DELETE *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbEscalasPorTrayecto_Delete
(
@estr_Id INT
)
AS
BEGIN
	BEGIN TRY
		
		UPDATE	flet.tbEscalasPorTrayecto
		SET		estr_Estado = 0
		WHERE	estr_Id = @estr_Id
		
		SELECT 1 codestatus
	
	END TRY
	BEGIN CATCH
		SELECT 0 codestatus
	END CATCH
END



-----------------------------------------------------------------------------------------------------------------------------
--*******************FLETE DETALLES*******************--

--************** VIEW *****************--
GO
CREATE OR ALTER VIEW flet.VW_tbFleteDetalles
AS
SELECT	fdet_Id, 
		T1.flet_Id,
		T4.vehi_Id,
		T6.vehi_Placa,
		T6.mode_Id,
		T7.mode_Nombre,
		T7.marc_Id,
		T8.marc_Nombre,
		T7.tipv_Id,
		T9.tipv_Descripcion,
		T4.empe_Id,
		T5.empe_Nombres  + ' ' + T5.empe_Apellidos AS empe_NombreCompleto,
		T5.empe_Identidad, 
		T5.empe_FechaNacimiento, 
		T5.empe_Sexo, 
		T5.eciv_Id, 
		T5.muni_Id, 
		T5.empe_DireccionExacta, 
		T5.empe_Telefono, 
		T5.sucu_Id, 
		T10.sucu_Nombre,
		T5.carg_Id, 
		T11.carg_Descripcion,
		T4.flet_FechaDeSalida,
		pedi_Id,
		fdet_UsuCreacion, 
		fdet_FechaCreacion, 
		fdet_UsuModificacion, 
		fdet_FechaModificacion, 
		fdet_Estado,
		t2.user_NombreUsuario AS user_Creacion,
		t3.user_NombreUsuario AS user_Modificacion
  FROM flet.tbFleteDetalles T1 INNER JOIN acce.tbUsuarios T2
  ON T1.fdet_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios T3
  ON T1.fdet_UsuModificacion = T3.[user_Id] INNER JOIN flet.tbFletes T4
  ON T1.flet_Id = T4.flet_Id INNER JOIN flet.tbEmpleados T5
  ON T4.empe_Id = T5.empe_Id INNER JOIN equi.tbVehiculos T6
  ON T4.vehi_Id = T6.vehi_Id INNER JOIN equi.tbModelos T7
  ON T6.mode_Id	= T7.mode_Id INNER JOIN equi.tbMarcas T8
  ON T7.marc_Id	= T8.marc_Id INNER JOIN equi.tbTipoDeVehiculo T9
  ON T7.tipv_Id	= T9.tipv_Id INNER JOIN flet.tbSucursales T10
  ON T5.sucu_Id = T10.sucu_Id INNER JOIN gral.tbCargos T11
  ON T5.carg_Id = T11.carg_Id


--************** INDEX *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbFleteDetalles_Index
AS 
BEGIN
	SELECT * FROM flet.VW_tbFleteDetalles
	WHERE fdet_Estado = 1
END


--************** FIND *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbFleteDetalles_Find
(
@fdet_Id	INT
)
AS 
BEGIN
	SELECT * FROM flet.VW_tbFleteDetalles
	WHERE fdet_Id = @fdet_Id
END


--************** INSERT *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbFleteDetalles_Insert 
(
@flet_Id			INT, 
@pedi_Id			INT, 
@fdet_UsuCreacion	INT
)
AS
BEGIN
	BEGIN TRY
        
		INSERT INTO flet.tbFleteDetalles (flet_Id, pedi_Id, fdet_UsuCreacion)
		VALUES	(@flet_Id, @pedi_Id, @fdet_UsuCreacion)

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--************** UPDATE *****************--
Go
CREATE OR ALTER PROCEDURE flet.UDP_tbFleteDetalles_Update
(
@fdet_Id				INT,
@flet_Id				INT, 
@pedi_Id				INT, 
@fdet_UsuModificacion	INT
 )
AS
BEGIN
	BEGIN TRY
      
		UPDATE	flet.tbFleteDetalles
		SET		flet_Id = @flet_Id,
				pedi_Id  = @pedi_Id,
				fdet_UsuModificacion = @fdet_UsuModificacion,
				fdet_FechaModificacion = GETDATE()
		WHERE	fdet_Id = @fdet_Id

		SELECT 1 codeStatus

	END TRY
	BEGIN CATCH
		SELECT 0  codeStatus
	END CATCH
END


--************** DELETE *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbFleteDetalles_Delete
(
@fdet_Id INT
)
AS
BEGIN
	BEGIN TRY
		
		UPDATE	flet.tbFleteDetalles
		SET		fdet_Estado = 0
		WHERE	fdet_Id = @fdet_Id
		
		SELECT 1 codestatus
	
	END TRY
	BEGIN CATCH
		SELECT 0 codestatus
	END CATCH
END


-----------------------------------------------------------------------------------------------------------------------------
--**********************FLETES************************--

--************** VIEW *****************--
GO
CREATE OR ALTER VIEW flet.VW_tbFletes
AS
SELECT	flet_Id, 
		vehi_Id, 
		T1.empe_Id, 
		T4.empe_Nombres  + ' ' + T4.empe_Apellidos AS empe_NombreCompleto,
		T4.empe_Identidad, 
		T4.empe_FechaNacimiento, 
		T4.empe_Sexo, 
		T4.eciv_Id, 
		T4.muni_Id, 
		T4.empe_DireccionExacta, 
		T4.empe_Telefono, 
		T4.sucu_Id, 
		T5.sucu_Nombre,
		T4.carg_Id, 
		T6.carg_Descripcion,
		tray_Id, 
		flet_FechaDeSalida, 
		flet_UsuCreacion, 
		flet_FechaCreacion, 
		flet_UsuModificacion, 
		flet_FechaModificacion, 
		flet_Estado,
		t2.user_NombreUsuario AS user_Creacion,
		t3.user_NombreUsuario AS user_Modificacion
  FROM flet.tbFletes T1 INNER JOIN acce.tbUsuarios T2
  ON T1.flet_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios T3
  ON T1.flet_UsuModificacion = T3.[user_Id] INNER JOIN flet.tbEmpleados T4
  ON T1.empe_Id = T4.empe_Id INNER JOIN flet.tbSucursales T5
  ON T4.sucu_Id = T5.sucu_Id INNER JOIN gral.tbCargos T6
  ON T4.carg_Id = T6.carg_Id


--************** INDEX *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbFletes_Index
AS 
BEGIN
	SELECT * FROM flet.VW_tbFletes
	WHERE flet_Estado = 1
END


--************** FIND *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbFletes_Find
(
@flet_Id	INT
)
AS 
BEGIN
	SELECT * FROM flet.VW_tbFletes
	WHERE flet_Id = @flet_Id
END


--************** INSERT *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbFletes_Insert 
(
@vehi_Id			INT, 
@empe_Id			INT, 
@tray_Id			INT, 
@flet_FechaDeSalida DATE, 
@flet_UsuCreacion	INT
)
AS
BEGIN
	BEGIN TRY
        
		INSERT INTO flet.tbFletes (vehi_Id, empe_Id, tray_Id, flet_FechaDeSalida, flet_UsuCreacion)
		VALUES	(@vehi_Id, @empe_Id, @tray_Id, @flet_FechaDeSalida, @flet_UsuCreacion)

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--************** UPDATE *****************--
Go
CREATE OR ALTER PROCEDURE flet.UDP_tbFletes_Update
(
@flet_Id				INT,
@vehi_Id				INT, 
@empe_Id				INT, 
@tray_Id				INT, 
@flet_FechaDeSalida		DATE, 
@flet_UsuModificacion	INT
 )
AS
BEGIN
	BEGIN TRY
      
		UPDATE	flet.tbFletes
		SET		vehi_Id = @vehi_Id,
				empe_Id	= @empe_Id,
				tray_Id	= @tray_Id,
				flet_FechaDeSalida = @flet_FechaDeSalida,
				flet_UsuModificacion = @flet_UsuModificacion,
				flet_FechaModificacion = GETDATE()
		WHERE	flet_Id = @flet_Id

		SELECT 1 codeStatus

	END TRY
	BEGIN CATCH
		SELECT 0  codeStatus
	END CATCH
END


--************** DELETE *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbFletes_Delete
(
@flet_Id INT
)
AS
BEGIN
	BEGIN TRY
		
		UPDATE	flet.tbFletes
		SET		flet_Estado = 0
		WHERE	flet_Id = @flet_Id
		
		SELECT 1 codestatus
	
	END TRY
	BEGIN CATCH
		SELECT 0 codestatus
	END CATCH
END

-----------------------------------------------------------------------------------------------------------------------------
--***********************ITEMS************************--

--************** VIEW *****************--
GO
CREATE OR ALTER VIEW flet.VW_tbItems
AS
SELECT	item_Id, 
		item_Nombre, 
		item_Descripcion,
		item_Peso, 
		item_Volumen, 
		item_Habilitado,
		CASE
			WHEN item_Habilitado = 1 THEN 'Habilitado'
			WHEN item_Habilitado = 0 THEN 'Deshabilitado'
			ELSE 'error'
		END AS item_Visible,
		item_UsuCreacion, 
		item_FechaCreacion, 
		item_UsuModificacion, 
		item_FechaModificacion, 
		item_Estado,
		t2.user_NombreUsuario AS user_Creacion,
		t3.user_NombreUsuario AS user_Modificacion
  FROM flet.tbItems T1 INNER JOIN acce.tbUsuarios T2
  ON T1.item_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios T3
  ON T1.item_UsuModificacion = T3.[user_Id] 


--************** INDEX *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbItems_Index
AS 
BEGIN
	SELECT * FROM flet.VW_tbItems
	WHERE item_Estado = 1
END


--************** FIND *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbItems_Find
(
@item_Id	INT
)
AS 
BEGIN
	SELECT * FROM flet.VW_tbItems
	WHERE item_Id = @item_Id
END


--************** INSERT *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbItems_Insert 
(
@item_Nombre		NVARCHAR(100), 
@item_Descripcion	NVARCHAR(100),
@item_Peso			DECIMAL(18,2), 
@item_Volumen		DECIMAL(18,2), 
@item_UsuCreacion	INT
)
AS
BEGIN
	BEGIN TRY
        
		INSERT INTO flet.tbItems (item_Nombre, item_Descripcion, item_Peso, item_Volumen, item_UsuCreacion)
		VALUES	(@item_Nombre, @item_Descripcion, @item_Peso, @item_Volumen, @item_UsuCreacion)

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--************** UPDATE *****************--
Go
CREATE OR ALTER PROCEDURE flet.UDP_tbItems_Update
(
@item_Id				INT,
@item_Nombre			NVARCHAR(100), 
@item_Descripcion		NVARCHAR(100),
@item_Peso				DECIMAL(18,2), 
@item_Volumen			DECIMAL(18,2), 
@item_UsuModificacion	INT 
 )
AS
BEGIN
	BEGIN TRY
      
		UPDATE	flet.tbItems
		SET		item_Nombre	= @item_Nombre,
				item_Descripcion = @item_Descripcion,
				item_Peso = @item_Peso,
				item_Volumen = @item_Volumen,
				item_UsuModificacion = @item_UsuModificacion,
				item_FechaModificacion  = GETDATE()
		WHERE	item_Id = @item_Id

		SELECT 1 codeStatus

	END TRY
	BEGIN CATCH
		SELECT 0  codeStatus
	END CATCH
END


--************** DELETE *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbItems_Delete
(
@item_Id INT
)
AS
BEGIN
	BEGIN TRY
		
		UPDATE	flet.tbItems
		SET		item_Estado = 0
		WHERE	item_Id = @item_Id
		
		SELECT 1 codestatus
	
	END TRY
	BEGIN CATCH
		SELECT 0 codestatus
	END CATCH
END


-----------------------------------------------------------------------------------------------------------------------------
--******************PEDIDO DETALLES*******************--

--************** VIEW *****************--
GO
CREATE OR ALTER VIEW flet.VW_tbPedidoDetalles
AS
SELECT	pdet_Id,
		T1.item_Id,
		item_Nombre,
		item_Descripcion,
		item_Peso,
		item_Volumen, 
		pdet_UsuCreacion, 
		pdet_FechaCreacion, 
		pdet_UsuModificacion, 
		pdet_FechaModificacion, 
		pdet_Estado,
		t2.user_NombreUsuario AS user_Creacion,
		t3.user_NombreUsuario AS user_Modificacion
  FROM flet.tbPedidoDetalles T1 INNER JOIN acce.tbUsuarios T2
  ON T1.pdet_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios T3
  ON T1.pdet_UsuModificacion = T3.[user_Id] INNER JOIN flet.tbItems T4
  ON T1.item_Id = T4.item_Id


--************** INDEX *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbPedidoDetalles_Index
AS 
BEGIN
	SELECT * FROM flet.VW_tbPedidoDetalles
	WHERE pdet_Estado = 1
END


--************** FIND *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbPedidoDetalles_Find
(
@pdet_Id	INT
)
AS 
BEGIN
	SELECT * FROM flet.VW_tbPedidoDetalles
	WHERE pdet_Id = @pdet_Id
END


--************** INSERT *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbPedidoDetalles_Insert 
(
@item_Id			INT,
@pdet_UsuCreacion	INT
)
AS
BEGIN
	BEGIN TRY
        
		INSERT INTO flet.tbPedidoDetalles (item_Id, pdet_UsuCreacion)
		VALUES	(@item_Id, @pdet_UsuCreacion)

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--************** UPDATE *****************--
Go
CREATE OR ALTER PROCEDURE flet.UDP_tbPedidoDetalles_Update
(
@pdet_Id				INT,
@item_Id				INT,
@pdet_UsuModificacion	INT
 )
AS
BEGIN
	BEGIN TRY
      
		UPDATE	flet.tbPedidoDetalles
		SET		item_Id = @item_Id,
				pdet_UsuModificacion = @pdet_UsuModificacion,
				pdet_FechaModificacion  = GETDATE()
		WHERE	pdet_Id = @pdet_Id

		SELECT 1 codeStatus

	END TRY
	BEGIN CATCH
		SELECT 0  codeStatus
	END CATCH
END


--************** DELETE *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbPedidoDetalles_Delete
(
@pdet_Id INT
)
AS
BEGIN
	BEGIN TRY
		
		UPDATE	flet.tbPedidoDetalles
		SET		pdet_Estado = 0
		WHERE	pdet_Id = @pdet_Id
		
		SELECT 1 codestatus
	
	END TRY
	BEGIN CATCH
		SELECT 0 codestatus
	END CATCH
END


-----------------------------------------------------------------------------------------------------------------------------
--**********************PEDIDOS***********************--

--************** VIEW *****************--
GO
CREATE OR ALTER VIEW flet.VW_tbPedidos
AS
SELECT	pedi_Id, 
		T1.clie_Id,
		clie_Nombres + ' ' + clie_Apellidos AS clie_NombreCompleto,
		clie_Identidad, 
		clie_FechaNacimiento, 
		clie_Sexo, 
		eciv_Id,  
		clie_DireccionExacta, 
		clie_Telefono, 
		muni_Origen, 
		T5.muni_Nombre AS pedi_OrigenNombre,
		T6.depa_Id AS pedi_DepaOrigenId,
		T6.depa_Nombre AS pedi_DepaOrigen,
		muni_Destino, 
		T7.muni_Nombre AS pedi_DestinoNombre,
		T8.depa_Id AS pedi_DepaDestinoId,
		T8.depa_Nombre   AS pedi_DepaDestino,
		pedi_DestinoFinal, 
		T1.estp_Id,
		T9.estp_Nombre,
		pedi_UsuCreacion, 
		pedi_FechaCreacion, 
		pedi_UsuModificacion, 
		pedi_FechaModificacion, 
		pedi_Estado,
		t2.user_NombreUsuario AS user_Creacion,
		t3.user_NombreUsuario AS user_Modificacion
  FROM flet.tbPedidos T1 INNER JOIN acce.tbUsuarios T2
  ON T1.pedi_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios T3
  ON T1.pedi_UsuModificacion = T3.[user_Id] INNER JOIN flet.tbClientes T4
  ON T1.clie_Id = T4.clie_Id  INNER JOIN gral.tbMunicipios T5
  ON T1.muni_Origen = T5.muni_Id  INNER JOIN gral.tbDepartamentos T6
  ON T5.depa_Id = T6.depa_Id INNER JOIN gral.tbMunicipios T7
  ON T1.muni_Destino = T7.muni_Id  INNER JOIN gral.tbDepartamentos T8
  ON T7.depa_Id = T8.depa_Id INNER JOIN flet.tbEstadosDelPedido T9
  ON T1.estp_Id = T9.estp_Id


--************** INDEX *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbPedidos_Index
AS 
BEGIN
	SELECT * FROM flet.VW_tbPedidos
	WHERE pedi_Estado = 1
END


--************** FIND *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbPedidos_Find
(
@pedi_Id	INT
)
AS 
BEGIN
	SELECT * FROM flet.VW_tbPedidos
	WHERE pedi_Id = @pedi_Id
END


--************** INSERT *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbPedidos_Insert 
(
@clie_Id			INT,
@muni_Origen		INT,
@muni_Destino		INT,
@pedi_DestinoFinal	NVARCHAR(250),
@pedi_UsuCreacion	INT
)
AS
BEGIN
	BEGIN TRY
        
		INSERT INTO flet.tbPedidos (clie_Id, muni_Origen, muni_Destino, pedi_DestinoFinal, pedi_UsuCreacion, estp_Id)
		VALUES	(@clie_Id, @muni_Origen, @muni_Destino, @pedi_DestinoFinal, @pedi_UsuCreacion, 1)

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--************** UPDATE *****************--
Go
CREATE OR ALTER PROCEDURE flet.UDP_tbPedidos_Update
(
@pedi_Id				INT,
@clie_Id				INT,
@muni_Origen			INT,
@muni_Destino			INT,
@estp_Id				INT,
@pedi_DestinoFinal		NVARCHAR(250),
@pedi_UsuModificacion	INT
 )
AS
BEGIN
	BEGIN TRY
      
		UPDATE	flet.tbPedidos
		SET		clie_Id = @clie_Id,
				muni_Origen = @muni_Origen,
				muni_Destino = @muni_Destino,
				estp_Id = @estp_Id,
				pedi_DestinoFinal = @pedi_DestinoFinal,
				pedi_UsuModificacion = @pedi_UsuModificacion,
				pedi_FechaModificacion  = GETDATE()
		WHERE	pedi_Id = @pedi_Id

		SELECT 1 codeStatus

	END TRY
	BEGIN CATCH
		SELECT 0  codeStatus
	END CATCH
END


--************** DELETE *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbPedidos_Delete
(
@pedi_Id INT
)
AS
BEGIN
	BEGIN TRY
		
		UPDATE	flet.tbPedidos
		SET		pedi_Estado = 0
		WHERE	pedi_Id = @pedi_Id
		
		SELECT 1 codestatus
	
	END TRY
	BEGIN CATCH
		SELECT 0 codestatus
	END CATCH
END
-----------------------------------------------------------------------------------------------------------------------------
--*********************ESTADOS DEL PEDIDO*********************--
GO
CREATE OR ALTER VIEW flet.VW_tbEstadosDelPedido
AS
SELECT [estp_Id]
      ,[estp_Nombre]
      ,[estp_UsuCreacion]
	  ,estp_Habilitado,
		CASE
			WHEN estp_Habilitado = 1 THEN 'Habilitado'
			WHEN estp_Habilitado = 0 THEN 'Deshabilitado'
			ELSE 'error'
		END AS estp_Visible,
	  T2.user_NombreUsuario AS user_Creacion,
		estp_FechaCreacion, 
		estp_UsuModificacion, 
		T3.user_NombreUsuario AS user_Modificacion,
		estp_FechaModificacion, 
		estp_Estado
FROM [flet].[tbEstadosDelPedido] AS T1 INNER JOIN acce.tbUsuarios AS T2
ON T1.estp_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios AS T3
ON T1.estp_UsuModificacion = T3.[user_Id]

GO


--************** INDEX *****************--

CREATE OR ALTER PROCEDURE flet.UDP_tbEstadosDelPedido_Index
AS
BEGIN
	SELECT *
	FROM flet.VW_tbEstadosDelPedido
	WHERE estp_Estado = 1
END
GO

--************** FIND *****************--

CREATE OR ALTER PROCEDURE flet.UDP_tbEstadosDelPedido_Find
(
@estp_Id INT
)
AS
BEGIN
	SELECT *
	FROM flet.VW_tbEstadosDelPedido
	WHERE estp_Id = @estp_Id
END
GO

--************** INSERT *****************--

CREATE OR ALTER PROCEDURE flet.UDP_tbEstadosDelPedido_Insert
(
@estp_Nombre nvarchar(150),
@estp_UsuCreacion int
)
AS
BEGIN

	BEGIN TRY
	IF EXISTS (SELECT * FROM flet.tbEstadosDelPedido WHERE estp_Nombre = @estp_Nombre AND estp_Estado = 1)
	BEGIN
		SELECT -2
	END
	ELSE IF NOT EXISTS (SELECT * FROM flet.tbEstadosDelPedido WHERE estp_Nombre = @estp_Nombre)
	BEGIN
		INSERT INTO [flet].[tbEstadosDelPedido]
					   ([estp_Nombre]
					   ,[estp_UsuCreacion]
					   ,[estp_FechaCreacion])
				 VALUES
					   (@estp_Nombre
					   ,@estp_UsuCreacion
					   ,GETDATE())

	SELECT 1
	END
	ELSE 
	BEGIN 
		UPDATE [flet].[tbEstadosDelPedido]
		SET estp_Estado = 1
		WHERE estp_Nombre = @estp_Nombre
			
	SELECT 1
	END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
	
END
GO


--************** Update *****************--

CREATE OR ALTER PROCEDURE flet.UDP_tbEstadosDelPedido_Update
(
@estp_Id int,
@estp_Nombre nvarchar(150),
@estp_UsuModificacion int
)
AS
BEGIN

	BEGIN TRY
	IF EXISTS (SELECT * FROM flet.tbEstadosDelPedido WHERE estp_Nombre = @estp_Nombre AND estp_Id != @estp_Id AND estp_Estado = 1)
	BEGIN
		SELECT -2
	END
	ELSE
	BEGIN
			UPDATE [flet].[tbEstadosDelPedido]
		SET estp_Nombre = @estp_Nombre,
			estp_UsuModificacion = @estp_UsuModificacion,
			estp_FechaModificacion = GETDATE()
		WHERE estp_Id = @estp_Id

	SELECT 1
	END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
	
END
GO


--************** Delete *****************--
CREATE OR ALTER PROCEDURE flet.UDP_tbEstadosDelPedido_Delete
(
@estp_Id int
)
AS
BEGIN

	BEGIN TRY
	IF EXISTS (SELECT * FROM flet.tbPedidos WHERE estp_Id = @estp_Id AND pedi_Estado = 1)
	BEGIN
		SELECT -2
	END
	ELSE 
	BEGIN 
		UPDATE [flet].[tbEstadosDelPedido]
		SET estp_Estado = 0
		WHERE estp_Id = @estp_Id
			
	SELECT 1
	END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
	
END
GO




-----------------------------------------------------------------------------------------------------------------------------
--*********************SUCURSALES*********************--

--************** VIEW *****************--
GO
CREATE OR ALTER VIEW flet.VW_tbSucursales
AS
SELECT	sucu_Id, 
		sucu_Nombre, 
		T1.muni_Id,
		muni_Nombre,
		T4.depa_Id,
		depa_Nombre, 
		sucu_Direccion, 
		sucu_UsuCreacion, 
		sucu_FechaCreacion, 
		sucu_UsuModificacion, 
		sucu_FechaModificacion, 
		sucu_Estado,
		t2.user_NombreUsuario AS user_Creacion,
		t3.user_NombreUsuario AS user_Modificacion
  FROM flet.tbSucursales T1 INNER JOIN acce.tbUsuarios T2
  ON T1.sucu_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios T3
  ON T1.sucu_UsuModificacion = T3.[user_Id] INNER JOIN gral.tbMunicipios T4
  ON T1.muni_Id= T4.muni_Id INNER JOIN gral.tbDepartamentos T5
  ON T4.depa_Id= T5.depa_Id


--************** INDEX *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbSucursales_Index
AS 
BEGIN
	SELECT * FROM flet.VW_tbSucursales
	WHERE sucu_Estado = 1
END


--************** FIND *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbSucursales_Find
(
@sucu_Id	INT
)
AS 
BEGIN
	SELECT * FROM flet.VW_tbSucursales
	WHERE sucu_Id = @sucu_Id
END


--************** INSERT *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbSucursales_Insert
(
@sucu_Nombre		NVARCHAR(200),
@muni_Id			INT,
@sucu_Direccion		NVARCHAR(200), 
@sucu_UsuCreacion	INT
)
AS
BEGIN
	BEGIN TRY
        
		INSERT INTO flet.tbSucursales (sucu_Nombre, muni_Id, sucu_Direccion, sucu_UsuCreacion)
		VALUES	(@sucu_Nombre, @muni_Id, @sucu_Direccion, @sucu_UsuCreacion)

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--************** UPDATE *****************--
Go
CREATE OR ALTER PROCEDURE flet.UDP_tbSucursales_Update
(
@sucu_Id				INT,
@sucu_Nombre			NVARCHAR(200),
@muni_Id				INT,
@sucu_Direccion			NVARCHAR(200), 
@sucu_UsuModificacion	INT
 )
AS
BEGIN
	BEGIN TRY
      
		UPDATE	flet.tbSucursales
		SET		sucu_Nombre  = @sucu_Nombre,
				muni_Id = @muni_Id,
				sucu_Direccion= @sucu_Direccion,
				sucu_UsuModificacion = @sucu_UsuModificacion,
				sucu_FechaModificacion  = GETDATE()
		WHERE	sucu_Id = @sucu_Id

		SELECT 1 codeStatus

	END TRY
	BEGIN CATCH
		SELECT 0  codeStatus
	END CATCH
END


--************** DELETE *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbSucursales_Delete
(
@sucu_Id INT
)
AS
BEGIN
	BEGIN TRY
		
		UPDATE	flet.tbSucursales
		SET		sucu_Estado = 0
		WHERE	sucu_Id = @sucu_Id
		
		SELECT 1 codestatus
	
	END TRY
	BEGIN CATCH
		SELECT 0 codestatus
	END CATCH
END


-----------------------------------------------------------------------------------------------------------------------------
--*********************TRAYECTOS**********************--

--************** VIEW *****************--
GO
CREATE OR ALTER VIEW flet.VW_tbTrayectos
AS
SELECT	tray_Id,
		'Trayecto de ' + T4.muni_Nombre + ' a ' + T6.muni_Nombre AS tray_Descripcion,
		muni_Inicio, 
		T4.muni_Nombre AS muni_InicioNombre,
		T5.depa_Id AS depa_Inicio,
		T5.depa_Nombre AS depa_InicioNombre,
		muni_Final, 
		T6.muni_Nombre AS muni_FinalNombre,
		T7.depa_Id AS depa_Final,
		T7.depa_Nombre AS depa_FinalNombre,
		tray_UsuCreacion, 
		tray_FechaCreacion, 
		tray_UsuModificacion, 
		tray_FechaModificacion, 
		tray_Estado,
		t2.user_NombreUsuario AS user_Creacion,
		t3.user_NombreUsuario AS user_Modificacion
  FROM flet.tbTrayectos T1 INNER JOIN acce.tbUsuarios T2
  ON T1.tray_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios T3
  ON T1.tray_UsuModificacion = T3.[user_Id] INNER JOIN gral.tbMunicipios T4
  ON T1.muni_Inicio= T4.muni_Id INNER JOIN gral.tbDepartamentos T5
  ON T4.depa_Id= T5.depa_Id INNER JOIN gral.tbMunicipios T6
  ON T1.muni_Inicio= T6.muni_Id INNER JOIN gral.tbDepartamentos T7
  ON T6.depa_Id= T7.depa_Id


--************** INDEX *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbTrayectos_Index
AS 
BEGIN
	SELECT * FROM flet.VW_tbTrayectos
	WHERE tray_Estado = 1
END


--************** FIND *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbTrayectos_Find
(
@tray_Id	INT
)
AS 
BEGIN
	SELECT * FROM flet.VW_tbTrayectos
	WHERE tray_Id = @tray_Id
END


--************** INSERT *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbTrayectos_Insert
(
@muni_Inicio		INT,
@muni_Final			INT, 
@tray_UsuCreacion	INT
)
AS
BEGIN
	BEGIN TRY
        
		INSERT INTO flet.tbTrayectos (muni_Inicio, muni_Final, tray_UsuCreacion)
		VALUES	(@muni_Inicio, @muni_Final, @tray_UsuCreacion)

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--************** UPDATE *****************--
Go
CREATE OR ALTER PROCEDURE flet.UDP_tbTrayectos_Update
(
@tray_Id				INT,
@muni_Inicio			INT,
@muni_Final				INT, 
@tray_UsuModificacion	INT
 )
AS
BEGIN
	BEGIN TRY
      
		UPDATE	flet.tbTrayectos
		SET		muni_Inicio  = @muni_Inicio,
				muni_Final = @muni_Final,
				tray_UsuModificacion = @tray_UsuModificacion,
				tray_FechaModificacion  = GETDATE()
		WHERE	tray_Id = @tray_Id

		SELECT 1 codeStatus

	END TRY
	BEGIN CATCH
		SELECT 0  codeStatus
	END CATCH
END


--************** DELETE *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbTrayectos_Delete
(
@tray_Id INT
)
AS
BEGIN
	BEGIN TRY
		
		UPDATE	flet.tbTrayectos
		SET		tray_Estado = 0
		WHERE	tray_Id = @tray_Id
		
		SELECT 1 codestatus
	
	END TRY
	BEGIN CATCH
		SELECT 0 codestatus
	END CATCH
END


-----------------------------------------------------------------------------------------------------------------------------
--****************UBICACION POR FLETE*****************--

--************** VIEW *****************--
GO
CREATE OR ALTER VIEW flet.VW_tbUbicacionPorFlete
AS
SELECT	ubif_Id, 
		flet_Id, 
		T1.muni_Id, 
		muni_Nombre,
		T4.depa_Id,
		depa_Nombre,
		ubif_UbicacionExacta, 
		ubif_UsuCreacion, 
		ubif_FechaCreacion, 
		ubif_UsuModificacion, 
		ubif_FechaModificacion, 
		ubif_Estado,
		t2.user_NombreUsuario AS user_Creacion,
		t3.user_NombreUsuario AS user_Modificacion
  FROM flet.tbUbicacionPorFlete T1 INNER JOIN acce.tbUsuarios T2
  ON T1.ubif_UsuCreacion = T2.[user_Id] LEFT JOIN acce.tbUsuarios T3
  ON T1.ubif_UsuModificacion = T3.[user_Id] INNER JOIN gral.tbMunicipios T4
  ON T1.muni_Id = T4.muni_Id INNER JOIN gral.tbDepartamentos T5
  ON T4.depa_Id= T5.depa_Id 


--************** INDEX *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbUbicacionPorFlete_Index
AS 
BEGIN
	SELECT * FROM flet.VW_tbUbicacionPorFlete
	WHERE ubif_Estado = 1
END


--************** FIND *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbUbicacionPorFlete_Find
(
@ubif_Id	INT
)
AS 
BEGIN
	SELECT * FROM flet.VW_tbUbicacionPorFlete
	WHERE ubif_Id = @ubif_Id
END


--************** INSERT *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbUbicacionPorFlete_Insert
(
@flet_Id				INT, 
@muni_Id				INT, 
@ubif_UbicacionExacta	NVARCHAR(MAX), 
@ubif_UsuCreacion		INT
)
AS
BEGIN
	BEGIN TRY
        
		INSERT INTO flet.tbUbicacionPorFlete (flet_Id, muni_Id, ubif_UbicacionExacta, ubif_UsuCreacion)
		VALUES	(@flet_Id, @muni_Id, @ubif_UbicacionExacta, @ubif_UsuCreacion)

		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--************** UPDATE *****************--
Go
CREATE OR ALTER PROCEDURE flet.UDP_tbUbicacionPorFlete_Update
(
@ubif_Id				INT,
@flet_Id				INT, 
@muni_Id				INT, 
@ubif_UbicacionExacta	NVARCHAR(MAX), 
@ubif_UsuModificacion	INT
 )
AS
BEGIN
	BEGIN TRY
      
		UPDATE	flet.tbUbicacionPorFlete
		SET		flet_Id = @flet_Id, 
				muni_Id = @muni_Id, 
				ubif_UbicacionExacta = @ubif_UbicacionExacta,
				ubif_UsuModificacion = @ubif_UsuModificacion,
				ubif_FechaModificacion  = GETDATE()
		WHERE	ubif_Id = @ubif_Id

		SELECT 1 codeStatus

	END TRY
	BEGIN CATCH
		SELECT 0  codeStatus
	END CATCH
END


--************** DELETE *****************--
GO
CREATE OR ALTER PROCEDURE flet.UDP_tbUbicacionPorFlete_Delete
(
@ubif_Id INT
)
AS
BEGIN
	BEGIN TRY
		
		UPDATE	flet.tbUbicacionPorFlete
		SET		ubif_Estado = 0
		WHERE	ubif_Id = @ubif_Id
		
		SELECT 1 codestatus
	
	END TRY
	BEGIN CATCH
		SELECT 0 codestatus
	END CATCH
END

