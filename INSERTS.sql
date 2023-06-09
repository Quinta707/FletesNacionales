﻿/*
USE master
DROP DATABASE FletesNacionales
*/

--USE FletesNacionales
--****************************************INSERTS ACCESO****************************************--
--****************************************ROLES****************************************--
INSERT INTO acce.tbRoles (role_Nombre,role_UsuCreacion)
VALUES	
		('Digitador', 1),
		('Empleado',1),
		('Motorista', 1);
--****************************************PANTALLAS****************************************--
	    INSERT INTO acce.tbPantallas (pant_Nombre, pant_Url, pant_Menu, pant_Icono, pant_UsuCreacion)
VALUES ('Departamentos',		'/gral/Departamentos/List',			'gral','maps',1),
	   ('Estado Civiles',		'/gral/EstadosCiviles/List',		'gral','bookmark',1),
	   ('Municipios',			'/gral/Municipios/List',			'gral','gallery',1),
	   ('Metodos de Pagos',		'/gral/MetodosDePago/List',			'gral','blog',1) ,

	   ('Clientes',				'/flet/Clientes/List',				'flet','user',1),
	   ('Fletes',				'/flet/Fletes/List',				'flet','bonus-kit',1),
	   ('Mis Fletes',			'/flet/Mis-Fletes/List',			'flet','bonus-kit',1),
	   ('Calendario',			'/flet/Calendario',					'flet','calender',1),
	   ('Items',				'/flet/Items/List',					'flet','ecommerce',1),
	   ('Pedidos',				'/flet/Pedidos/List',				'flet','task',1),
	   ('Sucursales',			'/flet/Sucursales/List',			'flet','others',1),
	   ('Estados del Pedido',	'/flet/EstadosdelPedido/List',		'flet','social',1),
	   ('Trayectos',			'/flet/Trayectos/List',				'flet','learning',1),
	   ('Empleados',			'/flet/Empleados/List',				'flet','social',1),

	   ('Modelos',				'/equi/Modelos/List',				'equi','faq',1),
	   ('Marcas',				'/equi/Marcas/List',				'equi','job-search',1),
	   ('Vehiculos',			'/equi/Vehiculos/List',				'equi','project',1),
	   ('Tipos de Vehiculos',	'/flet/TipodeVehiculo/List',		'equi','icons',1),
 	   ('Grafica',				'/flet/Grafica/List',				'acce','charts',1),

 	   ('Usuarios',				'/acce/Usuarios/List',				'acce','user',1),
        ('Roles',				'/acce/Roles/List',		'acce','learning',1)
GO
	   
--****************************************ROLES POR PANTALLAS****************************************--
INSERT INTO acce.tbPantallasPorRoles(pant_Id,role_Id , prol_UsuCreacion)
VALUES	--Admin
		--generales
		(1 ,1 ,1),
		(2 ,1 ,1),
		(3 ,1 ,1),
		(4 ,1 ,1),
		(5 ,1 ,1),
		--fletes
		(6 ,1 ,1),
		(7 ,1 ,1),
		(8 ,1 ,1),
		(9 ,1 ,1),
		(10,1 ,1),
		(11,1 ,1),
		(12,1 ,1),
		(13,1 ,1),
		(14,1 ,1),
		(15,1 ,1),
		--equipo
		(16,1 ,1),
		(17,1 ,1),
		(18,1 ,1),
		(19,1 ,1),
		--acceso
		(20,1 ,1),
		(21,1,1),
	
		--Digitador
		--generales
		--generales
		(1 ,2 ,1),
		(2 ,2 ,1),
		(3 ,2 ,1),
		(4 ,2 ,1),
		(5 ,2 ,1),
		--fletes
		(6 ,2 ,1),
		(7 ,2 ,1),
		(8 ,2 ,1),
		(9 ,2 ,1),
		(10,2 ,1),
		(11,2 ,1),
		(12,2 ,1),
		(13,2 ,1),
		(14,2 ,1),
		(15,2 ,1),
		--equipo
		(16,2 ,1),
		(17,2 ,1),
		(18,2 ,1),
		(19,2 ,1),

		--Empleado
		--generales
		(1 ,3 ,1),
		(2 ,3 ,1),
		(3 ,3 ,1),
		(4 ,3 ,1),
		(5 ,3 ,1),
		--eq4ipo
		(16,3 ,1),
		(17,3 ,1),
		(18,3 ,1),
		(19,3 ,1);
GO



--****************************************INSERTS GENERALES****************************************--
--****************************************DEPARTAMENTOS****************************************--
INSERT INTO gral.tbDepartamentos(depa_Id, depa_Nombre, depa_Estado, depa_UsuCreacion, depa_FechaCreacion, depa_UsuModificacion, depa_FechaModificacion)
VALUES	('01','Atlántida', '1', 1, GETDATE(), NULL, NULL),
		('02','Colón', '1', 1, GETDATE(), NULL, NULL),
		('03','Comayagua', '1', 1, GETDATE(), NULL,NULL),
		('04','Copán', '1', 1, GETDATE(), NULL, NULL),
		('05','Cortés', '1', 1, GETDATE(), NULL, NULL),
		('06','Choluteca', '1', 1, GETDATE(), NULL, NULL),
		('07','El Paraíso', '1', 1, GETDATE(), NULL, NULL),
		('08','Francisco Morazán', '1', 1, GETDATE(), NULL, NULL),
		('09','Gracias a Dios', '1', 1, GETDATE(), NULL, NULL),
		('10','Intibucá', '1', 1, GETDATE(), NULL, NULL),
		('11','Islas de la Bahía', '1', 1, GETDATE(), NULL, NULL),
		('12','La Paz', '1', 1, GETDATE(), NULL, NULL),
		('13','Lempira', '1', 1, GETDATE(), NULL,NULL ),
		('14','Ocotepeque', '1', 1, GETDATE(), NULL, NULL),
		('15','Olancho', '1', 1, GETDATE(), NULL, NULL),
		('16','Santa Bárbara', '1', 1, GETDATE(), NULL, NULL),
		('17','Valle', '1', 1, GETDATE(), NULL, NULL),
		('18','Yoro', '1', 1, GETDATE(), NULL, NULL);


GO

--****************************************MUNICIPIOS****************************************--

INSERT INTO gral.tbMunicipios(depa_Id, muni_Id, muni_Nombre, muni_Estado, muni_UsuCreacion, muni_FechaCreacion, muni_UsuModificacion, muni_FechaModificacion)
VALUES
	('01','0101','La Ceiba', '1', 1, GETDATE(), NULL, GETDATE()),
	('01','0102','El Porvenir', '1', 1, GETDATE(), NULL, GETDATE()),
	('01','0103','Tela', '1', 1, GETDATE(), NULL, GETDATE()),
	('01','0104','Jutiapa', '1', 1, GETDATE(), NULL, GETDATE()),
	('01','0105','La Masica', '1', 1, GETDATE(), NULL, GETDATE()),
	('01','0106','San Francisco', '1', 1, GETDATE(), NULL, GETDATE()),
	('01','0107','Arizona', '1', 1, GETDATE(), NULL, GETDATE()),
	('01','0108','Esparta', '1', 1, GETDATE(), NULL, GETDATE()),
	('02','0201','Trujillo', '1', 1, GETDATE(), NULL, GETDATE()),
	('02','0202','Balfate', '1', 1, GETDATE(), NULL, GETDATE()),
	('02','0203','Iriona', '1', 1, GETDATE(), NULL, GETDATE()),
	('02','0204','Limón', '1', 1, GETDATE(), NULL, GETDATE()),
	('02','0205','Sabá', '1', 1, GETDATE(), NULL, GETDATE()),
	('02','0206','Santa Fe', '1', 1, GETDATE(), NULL, GETDATE()),
	('02','0207','Santa Rosa de Aguan', '1', 1, GETDATE(), NULL, GETDATE()),
	('02','0208','Sonaguera', '1', 1, GETDATE(), NULL, GETDATE()),
	('02','0209','Tocoa', '1', 1, GETDATE(), NULL, GETDATE()),
	('02','0210','Bonito Oriental', '1', 1, GETDATE(), NULL, GETDATE()),
	('03','0301','Comayagua', '1', 1, GETDATE(), NULL, GETDATE()),
	('03','0302','Ajuterique', '1', 1, GETDATE(), NULL, GETDATE()),
	('03','0303','El Rosario', '1', 1, GETDATE(), NULL, GETDATE()),
	('03','0304','Esquías', '1', 1, GETDATE(), NULL, GETDATE()),
	('03','0305','Humuya', '1', 1, GETDATE(), NULL, GETDATE()),
	('03','0306','La Libertad', '1', 1, GETDATE(), NULL, GETDATE()),
	('03','0307','Lamaní', '1', 1, GETDATE(), NULL, GETDATE()),
	('03','0308','La Trinidad', '1', 1, GETDATE(), NULL, GETDATE()),
	('03','0309','Lejamani', '1', 1, GETDATE(), NULL, GETDATE()),
('03', '0310', 'Meámbar', '1', 1, GETDATE(), NULL, GETDATE()),
('03', '0311', 'Minas de Oro', '1', 1, GETDATE(), NULL, GETDATE()),
('03', '0312', 'Ojos de Agua', '1', 1, GETDATE(), NULL, GETDATE()),
('03', '0313', 'San Jerónimo', '1', 1, GETDATE(), NULL, GETDATE()),
('03', '0314', 'San José de Comayagua', '1', 1, GETDATE(), NULL, GETDATE()),
('03', '0315', 'San José del Potrero', '1', 1, GETDATE(), NULL, GETDATE()),
('03', '0316', 'San Luis', '1', 1, GETDATE(), NULL, GETDATE()),
('03', '0317', 'San Sebastián', '1', 1, GETDATE(), NULL, GETDATE()),
('03', '0318', 'Siguatepeque', '1', 1, GETDATE(), NULL, GETDATE()),
('03', '0319', 'Villa de San Antonio', '1', 1, GETDATE(), NULL, GETDATE()),
('03', '0320', 'Las Lajas', '1', 1, GETDATE(), NULL, GETDATE()),

('04', '0401', 'Santa Rosa de Copán', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0402', 'Cabañas', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0403', 'Concepción', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0404', 'Copán Ruinas', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0405', 'Corquín', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0406', 'Cucuyagua', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0407', 'Dolores', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0408', 'Dulce Nombre', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0409', 'El Paraíso', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0410', 'Florida', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0411', 'La Jigua', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0412', 'La Unión', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0413', 'Nueva Arcadia', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0414', 'San Agustín', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0415', 'San Antonio', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0416', 'San Jerónimo', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0417', 'San José', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0418', 'San Juan de Opoa', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0419', 'San Nicolás', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0420', 'San Pedro', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0421', 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0422', 'Trinidad de Copán', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0423', 'Veracruz', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0424', 'San Francisco de Ojuera', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0425', 'San José de Copán', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0426', 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0427', 'La Encarnación', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0428', 'San Miguel', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0429', 'La Paz', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0430', 'La Labor', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0431', 'San Marcos', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0432', 'San Pedro', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0433', 'Santa Rosa', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0434', 'Copán', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0435', 'La Unión', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0436', 'Santa Rosa de Copán', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0437', 'San Luis', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0438', 'San Sebastián', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0439', 'Santa Cruz de Yojoa', '1', 1, GETDATE(), NULL, GETDATE()),
('04', '0440', 'Sinuapa', '1', 1, GETDATE(), NULL, GETDATE()),

('05', '0501', 'Juticalpa', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0502', 'Campamento', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0503', 'Catacamas', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0504', 'Concordia', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0505', 'Dulce Nombre de Culmí', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0506', 'El Rosario', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0507', 'Esquipulas del Norte', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0508', 'Gualaco', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0509', 'Guarizama', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0510', 'Guata', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0511', 'Guayape', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0512', 'Jano', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0513', 'La Unión', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0514', 'Mangulile', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0515', 'Manto', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0516', 'Salamá', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0517', 'San Esteban', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0518', 'San Francisco de Becerra', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0519', 'San Francisco de la Paz', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0520', 'Santa María del Real', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0521', 'Silca', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0522', 'Yocón', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0523', 'Patuca', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0524', 'Santa María del Real', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0525', 'Yocón', '1', 1, GETDATE(), NULL, GETDATE()),
('05', '0526', 'Patuca', '1', 1, GETDATE(), NULL, GETDATE()),
('06', '0601', 'La Esperanza', '1', 1, GETDATE(), NULL, GETDATE()),
('06', '0602', 'Camasca', '1', 1, GETDATE(), NULL, GETDATE()),
('06', '0603', 'Colomoncagua', '1', 1, GETDATE(), NULL, GETDATE()),
('06', '0604', 'Concepción', '1', 1, GETDATE(), NULL, GETDATE()),
('06', '0605', 'Dolores', '1', 1, GETDATE(), NULL, GETDATE()),
('06', '0606', 'Intibucá', '1', 1, GETDATE(), NULL, GETDATE()),
('06', '0607', 'Jesús de Otoro', '1', 1, GETDATE(), NULL, GETDATE()),
('06', '0608', 'Magdalena', '1', 1, GETDATE(), NULL, GETDATE()),
('06', '0609', 'Masaguara', '1', 1, GETDATE(), NULL, GETDATE()),
('06', '0610', 'San Antonio', '1', 1, GETDATE(), NULL, GETDATE()),
('06', '0611', 'San Isidro', '1', 1, GETDATE(), NULL, GETDATE()),
('06', '0612', 'San Juan', '1', 1, GETDATE(), NULL, GETDATE()),
('06', '0613', 'San Marcos de la Sierra', '1', 1, GETDATE(), NULL, GETDATE()),
('06', '0614', 'San Miguelito', '1', 1, GETDATE(), NULL, GETDATE()),
('06', '0615', 'Santa Lucía', '1', 1, GETDATE(), NULL, GETDATE()),
('06', '0616', 'Yamaranguila', '1', 1, GETDATE(), NULL, GETDATE()),
('06', '0617', 'San Francisco de Opalaca', '1', 1, GETDATE(), NULL, GETDATE()),
('07', '0701', 'Roatán', '1', 1, GETDATE(), NULL, GETDATE()),
('07', '0702', 'Baja Mar', '1', 1, GETDATE(), NULL, GETDATE()),
('07', '0703', 'Cayos Cochinos', '1', 1, GETDATE(), NULL, GETDATE()),
('07', '0704', 'José Santos Guardiola', '1', 1, GETDATE(), NULL, GETDATE()),
('07', '0705', 'Utila', '1', 1, GETDATE(), NULL, GETDATE()),
('07', '0706', 'Camp Bay', '1', 1, GETDATE(), NULL, GETDATE()),
('07', '0707', 'Guanaja', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0801', 'Juticalpa', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0802', 'Campamento', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0803', 'Catacamas', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0804', 'Concordia', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0805', 'Dulce Nombre de Culmí', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0806', 'El Rosario', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0807', 'Esquipulas del Norte', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0808', 'Gualaco', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0809', 'Guarizama', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0810', 'Guata', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0811', 'Guayape', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0812', 'Jacaleapa', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0813', 'La Unión', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0814', 'Manto', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0815', 'Salamá', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0816', 'San Esteban', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0817', 'San Francisco de Becerra', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0818', 'San Francisco de la Paz', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0819', 'Santa María del Real', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0820', 'Silca', '1', 1, GETDATE(), NULL, GETDATE()),
('08', '0821', 'Yocón', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0901', 'La Ceiba', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0902', 'El Porvenir', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0903', 'Esparta', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0904', 'Jutiapa', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0905', 'La Masica', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0906', 'San Francisco', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0907', 'Tela', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0908', 'Arizona', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0909', 'La Unión', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0910', 'Santa Fé', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0911', 'Brus Laguna', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0912', 'Juan Francisco Bulnes', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0913', 'Iriona', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0914', 'Limón', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0915', 'Puerto Lempira', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0916', 'Río Esteban', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0917', 'Bonito Oriental', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0918', 'Balfate', '1', 1, GETDATE(), NULL, GETDATE()),
('09', '0919', 'Juan Francisco Bulnes', '1', 1, GETDATE(), NULL, GETDATE()),
('10', '1001', 'Puerto Cortés', '1', 1, GETDATE(), NULL, GETDATE()),
('10', '1002', 'Omoa', '1', 1, GETDATE(), NULL, GETDATE()),
('10', '1003', 'Pimienta', '1', 1, GETDATE(), NULL, GETDATE()),
('10', '1004', 'Villanueva', '1', 1, GETDATE(), NULL, GETDATE()),
('10', '1005', 'San Francisco de Yojoa', '1', 1, GETDATE(), NULL, GETDATE()),
('10', '1006', 'Santa Cruz de Yojoa', '1', 1, GETDATE(), NULL, GETDATE()),
('10', '1007', 'Potrerillos', '1', 1, GETDATE(), NULL, GETDATE()),
('10', '1008', 'Pueblo Nuevo', '1', 1, GETDATE(), NULL, GETDATE()),
('10', '1009', 'San Manuel', '1', 1, GETDATE(), NULL, GETDATE()),
('10', '1010', 'Armenta', '1', 1, GETDATE(), NULL, GETDATE()),
('10', '1011', 'Cuyamel', '1', 1, GETDATE(), NULL, GETDATE()),
('10', '1012', 'Choloma', '1', 1, GETDATE(), NULL, GETDATE()),
('10', '1013', 'La Lima', '1', 1, GETDATE(), NULL, GETDATE()),
('10', '1014', 'Pimienta', '1', 1, GETDATE(), NULL, GETDATE()),
('10', '1015', 'Potrerillos', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1101', 'Yoro', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1102', 'El Progreso', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1103', 'Victoria', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1104', 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1105', 'El Negrito', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1106', 'Olanchito', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1107', 'Sulaco', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1108', 'Morazán', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1109', 'Yorito', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1110', 'Santa Cruz de Yojoa', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1111', 'Santos Guardiola', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1112', 'San Luis', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1113', 'Protección', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1114', 'Santa María del Real', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1115', 'El Negrito', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1116', 'Cofradía', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1117', 'San Francisco de Ojuera', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1118', 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1119', 'El Progreso', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1120', 'Victoria', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1121', 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1122', 'Yoro', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1123', 'Olanchito', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1124', 'El Negrito', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1125', 'Morazán', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1126', 'Victoria', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1127', 'Yorito', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1128', 'Sulaco', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1129', 'Santos Guardiola', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1130', 'Santa Cruz de Yojoa', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1131', 'San Luis', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1132', 'El Progreso', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1133', 'Protección', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1134', 'Santa María del Real', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1135', 'El Negrito', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1136', 'Cofradía', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1137', 'San Francisco de Ojuera', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1138', 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1139', 'El Progreso', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1140', 'Victoria', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1141', 'Santa Cruz de Yojoa', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1142', 'San Francisco de Ojuera', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1143', 'El Progreso', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1144', 'Morazán', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1145', 'Santa María del Real', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1146', 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1147', 'Cofradía', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1148', 'El Negrito', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1149', 'San Luis', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1150', 'Protección', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1151', 'Victoria', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1152', 'Sulaco', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1153', 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1154', 'Olanchito', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1155', 'Yoro', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1156', 'Santa Cruz de Yojoa', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1157', 'San Francisco de Ojuera', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1158', 'El Progreso', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1159', 'Morazán', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1160', 'Santa María del Real', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1161', 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1162', 'Cofradía', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1163', 'El Negrito', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1164', 'San Luis', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1165', 'Protección', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1166', 'Victoria', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1167', 'Sulaco', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1168', 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1169', 'Olanchito', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1170', 'Yoro', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1171', 'Santa Cruz de Yojoa', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1172', 'San Francisco de Ojuera', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1173', 'El Progreso', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1174', 'Morazán', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1175', 'Santa María del Real', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1176', 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1177', 'Cofradía', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1178', 'El Negrito', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1179', 'San Luis', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1180', 'Protección', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1181', 'Victoria', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1182', 'Sulaco', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1183', 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1184', 'Olanchito', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1185', 'Yoro', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1186', 'Santa Cruz de Yojoa', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1187', 'San Francisco de Ojuera', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1188', 'El Progreso', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1189', 'Morazán', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1190', 'Santa María del Real', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1191', 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1192', 'Cofradía', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1193', 'El Negrito', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1194', 'San Luis', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1195', 'Protección', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1196', 'Victoria', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1197', 'Sulaco', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1198', 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1199', 'Olanchito', '1', 1, GETDATE(), NULL, GETDATE()),
('11', '1200', 'Yoro', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1201', 'La Ceiba', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1202', 'El Porvenir', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1203', 'Esparta', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1204', 'Jutiapa', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1205', 'La Masica', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1206', 'San Francisco', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1207', 'Tela', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1208', 'Arizona', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1209', 'Esparta', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1210', 'Jutiapa', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1211', 'La Ceiba', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1212', 'El Porvenir', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1213', 'Esparta', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1214', 'Jutiapa', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1215', 'La Masica', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1216', 'San Francisco', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1217', 'Tela', '1', 1, GETDATE(), NULL, GETDATE()),
('12', '1218', 'Arizona', '1', 1, GETDATE(), NULL, GETDATE()),
	('12', '1219', 'Yarula', '1', 1, GETDATE(), NULL, GETDATE()),
('13', '1301', 'Gracias', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1302', 'Belén', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1303', 'Candelaria', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1304', 'Cololaca', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1305', 'Erandique', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1306', 'Gualcince', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1307', 'Guarita', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1308', 'La Campa', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1309', 'La Iguala', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1310', 'Las Flores', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1311', 'La Unión', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1312', 'La Virtud', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1313', 'Lepaera', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1314', 'Mapulaca', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1315', 'Piraera', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1316', 'San Andrés', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1317', 'San Francisco', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1318', 'San Juan Guarita', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1319', 'San Manuel Colohete', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1320', 'San Rafael', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1321', 'San Sebastián', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1322', 'Santa Cruz', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1323', 'Talgua', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1324', 'Tambla', '1', 1, GETDATE(), NULL, GETDATE()),
('13', '1326', 'Valladolid', '1', 1, GETDATE(), NULL, GETDATE()),
	('13', '1327', 'Virginia', '1', 1, GETDATE(), NULL, GETDATE()),
	('14', '1401', 'Yoro', '1', 1, GETDATE(), NULL, GETDATE()),
	('14', '1402', 'Arenal', '1', 1, GETDATE(), NULL, GETDATE()),
	('14', '1403', 'El Negrito', '1', 1, GETDATE(), NULL, GETDATE()),
	('14', '1404', 'El Progreso', '1', 1, GETDATE(), NULL, GETDATE()),
	('14', '1405', 'Jocón', '1', 1, GETDATE(), NULL, GETDATE()),
	('14', '1406', 'Morazán', '1', 1, GETDATE(), NULL, GETDATE()),
	('14', '1407', 'Olanchito', '1', 1, GETDATE(), NULL, GETDATE()),
	('14', '1408', 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
	('14', '1409', 'Sulaco', '1', 1, GETDATE(), NULL, GETDATE()),
	('14', '1410', 'Victoria', '1', 1, GETDATE(), NULL, GETDATE()),
	('15', '1501', 'Roatán', '1', 1, GETDATE(), NULL, GETDATE()),
	('15', '1502', 'Guanaja', '1', 1, GETDATE(), NULL, GETDATE()),
	('15', '1503', 'José Santos Guardiola', '1', 1, GETDATE(), NULL, GETDATE()),
	('15', '1504', 'Utila', '1', 1, GETDATE(), NULL, GETDATE()),
	('15', '1505', 'Santos Guardiola', '1', 1, GETDATE(), NULL, GETDATE()),
	('15', '1506', 'Barra Patuca', '1', 1, GETDATE(), NULL, GETDATE()),
	('15', '1507', 'Brus Laguna', '1', 1, GETDATE(), NULL, GETDATE()),
	('15', '1508', 'Juan Francisco Bulnes', '1', 1, GETDATE(), NULL, GETDATE()),
	('15', '1509', 'Santa Fe', '1', 1, GETDATE(), NULL, GETDATE()),
	('15', '1510', 'Sonsónate', '1', 1, GETDATE(), NULL, GETDATE()),
	('16', '1601', 'La Ceiba', '1', 1, GETDATE(), NULL, GETDATE()),
	('16', '1602', 'El Porvenir', '1', 1, GETDATE(), NULL, GETDATE()),
	('16', '1603', 'Esparta', '1', 1, GETDATE(), NULL, GETDATE()),
	('16', '1604', 'Jutiapa', '1', 1, GETDATE(), NULL, GETDATE()),
	('16', '1605', 'La Masica', '1', 1, GETDATE(), NULL, GETDATE()),
	('16', '1606', 'San Francisco', '1', 1, GETDATE(), NULL, GETDATE()),
	('16', '1607', 'Tela', '1', 1, GETDATE(), NULL, GETDATE()),
	('16', '1608', 'Arizona', '1', 1, GETDATE(), NULL, GETDATE()),
	('16', '1609', 'El Pino', '1', 1, GETDATE(), NULL, GETDATE()),
	('16', '1610', 'Guanaja', '1', 1, GETDATE(), NULL, GETDATE()),
	('17', '1701', 'Amapala', '1', 1, GETDATE(), NULL, GETDATE()),
	('17', '1702', 'Langue', '1', 1, GETDATE(), NULL, GETDATE()),
	('17', '1703', 'Nacaome', '1', 1, GETDATE(), NULL, GETDATE()),
	('17', '1704', 'San Francisco de Coray', '1', 1, GETDATE(), NULL, GETDATE()),
	('17', '1705', 'San Lorenzo', '1', 1, GETDATE(), NULL, GETDATE()),
	('17', '1706', 'Yarula', '1', 1, GETDATE(), NULL, GETDATE()),	
	('18', '1801', 'Nueva Ocotepeque', '1', 1, GETDATE(), NULL, GETDATE()),
	('18', '1802', 'Belén Gualcho', '1', 1, GETDATE(), NULL, GETDATE()),
	('18', '1803', 'Concepción', '1', 1, GETDATE(), NULL, GETDATE()),
	('18', '1804', 'Dolores Merendón', '1', 1, GETDATE(), NULL, GETDATE()),
	('18', '1805', 'Fraternidad', '1', 1, GETDATE(), NULL, GETDATE()),
	('18', '1806', 'La Encarnación', '1', 1, GETDATE(), NULL, GETDATE()),
	('18', '1807', 'La Labor', '1', 1, GETDATE(), NULL, GETDATE()),
	('18', '1808', 'Lucerna', '1', 1, GETDATE(), NULL, GETDATE()),
	('18', '1809', 'Mercedes', '1', 1, GETDATE(), NULL, GETDATE()),
	('18', '1810', 'San Fernando', '1', 1, GETDATE(), NULL, GETDATE()),
	('18', '1811', 'San Francisco del Valle', '1', 1, GETDATE(), NULL, GETDATE()),
	('18', '1812', 'San Jorge', '1', 1, GETDATE(), NULL, GETDATE()),
	('18', '1813', 'San Marcos', '1', 1, GETDATE(), NULL, GETDATE()),
	('18', '1814', 'Santa Fe', '1', 1, GETDATE(), NULL, GETDATE()),
	('18', '1815', 'Sensenti', '1', 1, GETDATE(), NULL, GETDATE()),
	('18', '1816', 'Sinuapa', '1', 1, GETDATE(), NULL, GETDATE())



--****************************************ESTADOS CIVILES****************************************--
INSERT INTO gral.tbEstadosCiviles (eciv_Descripcion, eciv_Estado, eciv_UsuCreacion, eciv_FechaCreacion, eciv_UsuModificacion, eciv_FechaModificacion)
VALUES	('Casado(a)', '1', 1, GETDATE(), NULL, NULL),
		('Divorciado(a)', '1', 1, GETDATE(), NULL, NULL),
		('Soltero(a)', '1', 1, GETDATE(), NULL, NULL),
		('Union Libre', '1', 1, GETDATE(), NULL, NULL),
		('Viudo(a)', '1', 1, GETDATE(), NULL, NULL);

--****************************************CARGOS****************************************--
INSERT INTO gral.tbCargos(carg_Descripcion, carg_UsuCreacion)
VALUES	('Supervisor', '1'),
		('Dependiente', '1'),
		('Morotista', '1');

--****************************************METODO DE PAGO****************************************--
INSERT INTO gral.tbMetodosdePago (meto_Descripcion,meto_UsuCreacion) 
VALUES	('Tarjeta de crédito', '1'),
		('PayPal', 1),
		('Transferencia bancaria', 1),
		('Cheque', 1),
		('Efectivo', 1);
		
--****************************************INSERTS EQUIPO****************************************--
--****************************************MARCA****************************************--
INSERT INTO equi.tbMarcas(marc_Nombre, marc_UsuCreacion)
VALUES	('BMW',1),
		('Audi',1),
		('Hyundai',1),
		('Honda',1),
		('Ford',1),
		('Toyota',1),
		('Volkswagen',1),
		('Fiat',1),
		('Jeep',1),
		('Kia',1),
		('Chevrolet',1)

GO
--****************************************TIPO DE VEHICULO****************************************--
INSERT INTO equi.tbTipoDeVehiculo (tipv_Descripcion,tipv_UsuCreacion)
VALUES	('Van',1),
		('Camion',1),
		('Furgon',1)

GO
--****************************************MODELO****************************************--
INSERT INTO equi.tbModelos (mode_Nombre, marc_Id, tipv_Id, mode_UsuCreacion)
VALUES ('Serie 2 Gran Tourer',1,1,1),
	   ('A6 Allroad Quattro',1,1,1),
	   ('Elantra',1,1,1),
	   ('Civic',1,3,1),
	   ('Mustang',1,2,1),
	   ('Tacoma',1,3,1),
	   ('Nivus',1,3,1),
	   ('Punto',1,3,1),
	   ('Grand Cherokee',1,2,1),
	   ('Picanto',1,2,1),
	   ('Camaro',2,2,1)

GO
--****************************************VEHICULO****************************************--

INSERT INTO equi.tbVehiculos (mode_Id,vehi_PesoMaximo,vehi_VolumenMaximo,vehi_Placa,vehi_UsuCreacion) 
VALUES (1,500,400,'PAA-1234',1),
(2,1000,900,'BVM-7890',1),
(3,2000,1900,'LNH-9012',1),
(4,7000,6900,'RTD-3456',1),
(5,35000,30000,'PAA-4321',1),
(6,8000,7500,'JIK-2345',1),
(7,9000,8700,'XSY-6789',1),
(8,10000,9000,'ZAN-0123',1),
(9 ,30000,27000,'DFR-4567',1),
(10 ,40000,34000,'RFD-4237',1)

--****************************************INSERTS FLETES****************************************--
--****************************************CLIENTE****************************************--

INSERT INTO flet.tbClientes(clie_Nombres, clie_Apellidos, clie_Identidad, clie_FechaNacimiento, clie_Sexo, eciv_Id, muni_Id, clie_DireccionExacta, clie_Telefono, clie_UsuCreacion)
VALUES	('Cristian', 'Aguilar', '0501-2004-98213', '02-02-2004', 'M', '1', '0501', 'Sps', '+504 8989-6734', '1'),
		('Esdra', 'Cerna', '1904-1989-67251', '04-02-1989', 'F', '1', '0501', 'Sps',  '+504 9341-9097', '1'),
		('Sarai', 'Quintanilla', '1109-1990-62781', '12-02-1990', 'F', '1', '0501', 'Sps',  '+504 9123-5543', '1'),
		('Marco', 'Torrez', '1109-1998-28192', '09-02-1998', 'M', '1', '0501', 'Sps',  '+504 8908-5463', '1'),
		('Celina', 'Arias', '0912-1990-64782', '09-07-1990', 'F', '1', '0501', 'Sps',  '+504 9657-7483', '1'),
		('Luis', 'Chicas', '0910-1992-98128', '09-01-1992', 'M', '1', '0501', 'Sps',  '+504 9834-5621', '1'),
		('Angie', 'Andino', '0912-1990-28739', '05-01-1990', 'F', '1', '0501', 'Sps',  '+504 9064-7869', '1'),
		('Nelson', 'Umaña', '1102-1989-00090', '02-07-1989', 'M', '1', '0501', 'Sps',  '+504 9345-5161', '1'),
		('Marbella', 'Gómez', '0815-1997-89023', '09-02-1997', 'F', '1', '0501', 'Sps',  '+504 9809-5461', '1'),
		('Carlos', 'Amaya', '0914-1995-67281', '09-05-1995', 'M', '1', '0501', 'Sps',  '+504 9109-6573', '1'),
		('Dayana', 'Erazo', '1805-1996-78934', '03-08-1995', 'F', '1', '0501', 'Sps',  '+504 9563-7381', '1'),
		('Jasson', 'Zaldívar', '0912-1998-56271', '09-08-1998', 'M', '1', '0501', 'Sps',  '+504 9100-7584', '1'),
		('Marlin', 'Guzmán', '0213-1994-56721', '10-07-1994', 'F', '1', '0501', 'Sps',  '+504 9822-5216', '1'),
		('Yoner', 'Zaldívar', '0913-1992-45162', '09-08-1992', 'M', '1', '0501', 'Sps',  '+504 8145-6627', '1'),
		('Juan', 'Sagastume', '0914-1998-20192', '09-07-1988', 'M', '1', '0501', 'Sps',  '+504 9203-8749', '1'),
		('Anthony', 'Leiva', '0415-1989-62592', '11-03-1989', 'M', '1', '0501', 'Sps',  '+504 9631-7521', '1'),
		('Paola', 'Decas', '0914-1996-78291', '09-08-1996', 'F', '1', '0501', 'Sps',  '+504 9561-2331', '1'),
		('Caleb', 'Benítez', '1401-1990-78676', '03-08-1990', 'M', '1', '0501', 'Sps',  '+504 9521-5547', '1'),
		('Exibia', 'Bueso', '0314-1998-00989', '02-08-1998', 'F', '1', '0501', 'Sps',  '+504 9312-7584', '1'),
		('Carlos', 'Herrera', '0314-1990-62712', '04-02-1990', 'M', '1', '0501', 'Sps',  '+504 9623-9956', '1'),
		('Ana', 'Fajardo', '0913-1990-92738', '09-09-1998', 'F', '1', '0501', 'Sps',  '+504 9027-8867', '1');

--INSERT TABLA USUARIOS
DECLARE @Pass AS NVARCHAR(MAX), @Clave AS NVARCHAR(250);
SET @Clave = 'xdd';
SET @Pass = CONVERT(NVARCHAR(MAX), HASHBYTES('sha2_512', @Clave))

INSERT INTO ACCE.tbUsuarios([user_NombreUsuario],[user_Contrasena],[user_EsAdmin],[role_ID],[empe_ID],[user_UsuCreacion])
VALUES('OscarB', @Pass, 0,2,2,1);
GO

DECLARE @Pass AS NVARCHAR(MAX), @Clave AS NVARCHAR(250);
SET @Clave = 'lalisa'
SET @Pass = CONVERT (NVARCHAR(MAX), HASHBYTES('sha2_512',@Clave))

INSERT INTO ACCE.tbUsuarios([user_NombreUsuario],[user_Contrasena],[user_EsAdmin],[role_ID],[empe_ID],[user_UsuCreacion])
VALUES('Lisa', @Pass, 0,3,3,1);
GO

DECLARE @Pass AS NVARCHAR(MAX), @Clave AS NVARCHAR(250);
SET @Clave = 'nimodo'
SET @Pass = CONVERT (NVARCHAR(MAX), HASHBYTES('sha2_512',@Clave))

INSERT INTO ACCE.tbUsuarios([user_NombreUsuario],[user_Contrasena],[user_EsAdmin],[role_ID],[empe_ID],[user_UsuCreacion])
VALUES('JoseXD', @Pass, 0,3,4,1 );
GO

DECLARE @Pass AS NVARCHAR(MAX), @Clave AS NVARCHAR(250);
SET @Clave = 'lagorda'
SET @Pass = CONVERT (NVARCHAR(MAX), HASHBYTES('sha2_512',@Clave))
INSERT INTO ACCE.tbUsuarios([user_NombreUsuario],[user_Contrasena],[user_EsAdmin],[role_ID],[empe_ID],[user_UsuCreacion])
VALUES('lornaSSD', @Pass, 0,3,5,1 );
GO
--****************************************ITEMS****************************************--
INSERT INTO flet.tbItems (item_Nombre, item_Descripcion, item_Peso, item_Volumen, item_UsuCreacion)
VALUES	('Lavadora Samsung','Modelo X$/AE LGBT',700,20.8, 1),
		('Lavadora LG','Modelo X$/AE LGBT',700,20.8, 1),
		('Lavadora Whirlpool','Modelo X$/AE LGBT',700,20.8, 1),
		('Lavadora Electrolux','Modelo X$/AE LGBT',700,20.8, 1),
		('Lavadora Bosch','Modelo X$/AE LGBT',700,20.8, 1),

		('Refrigerador Samsung','Modelo Samsung RF28R7551SR',400 ,70.6 ,1),
		('Refrigerador LG','Modelo LG LFXS28968S',400,70.6 ,1),
		('Refrigerador Whirlpool','Modelo Whirlpool WRF535SWHZ',400 ,70.6,1),
		('Refrigerador Electrolux','Modelo Electrolux EI23BC82SS',400,70.6 ,1),
		('Refrigerador Bosch','Modelo Bosch B36CT80SNS',400,70.6 ,1),

		('Horno KitchenAid','Modelo KitchenAid KOSE500ESS',350.3 ,70.6,1),
		('Horno Bosch','Modelo Bosch HBL8453UC',350.3 ,70.6,1),
		('Horno Whirlpool','Modelo Whirlpool WOS51EC0AS',380.3 ,70.6,1),
		('Horno LG','Modelo LG LWS3063ST',360.3 ,70.6,1),
		('Horno GE Appliances','Modelo GE JT5000SFSS',370.3 ,70.6,1),

		('Televisor Samsung',' Samsung QN65Q80A ',10.61 ,150,1),
		('Televisor Bosch','Modelo Bosch HBL8453UC',10.59,150,1),
		('Televisor Sony','Modelo Sony XBR55X950H ',10.5 ,150,1),
		('Televisor LG','Modelo TCL 65R635',10.3 ,150,1),
		('Televisor TCL','Modelo LG NanoCell 85 Series 75NANO85UNA ',10 ,150,1),

		('Aspiradora Dyson',' Dyson QN6WEREW5Q80A XBOX',20.5 ,50,1),
		('Aspiradora Shark','Modelo Shark HBLHGHFG8453UC',20.5,50,1),
		('Aspiradora Miele','Modelo Miele XBRBVCBCV55X950H ',20.50 ,5,1),
		('Aspiradora Hoover','Modelo Hoover 65R66635 PRO',20.5,50,1),
		('Aspiradora Bissell','Modelo Bissell DISCORD CELL',20.5,50,1)



--****************************************SUCURSALES****************************************--
INSERT INTO flet.tbSucursales (sucu_Nombre, muni_Id, sucu_Direccion, sucu_UsuCreacion)
VALUES	
('Fletes Horizon San Pedro Sula','0501','123 Calle Ficticia, Barrio Imaginario, San Pedro Sula, Honduras',1),
('Fletes Horizon Tegucigalpa','0801','Avenida Ejemplo 123, Colonia Imaginaria, Tegucigalpa, Honduras',1),
('Fletes Horizon Santa Rosa De Copan', '0401','Calle Ficticia 456, Barrio Imaginario, Santa Rosa de Copán, Honduras',1),
('Fletes Horizon Puerto Cortes','0506','Avenida Imaginaria 789, Colonia Ficticia, Puerto Cortés, Honduras',1),
('Fletes Horizon Santa Barbara','1601','Calle Principal 456, Colonia Santa Rosa, Santa Bárbara, Honduras',1),
('Fletes Horizon El Progreso','1804','Calle Ficticia 123, Barrio Imaginario, El Progreso, Honduras',1),
('Fletes Horizon Tocoa','0209','Avenida Central 789, Barrio San Juan, Tocoa, Honduras',1),
('Fletes Horizon La Ceiba','0101','Calle Principal 123, Barrio El Paraíso, La Ceiba, Honduras',1),
('Fletes Horizon Tela','0103','Avenida Costera 456, Colonia Playa Azul, Tela, Honduras',1),
('Fletes Horizon Siguatepeque','0318','Calle Principal 789, Barrio El Carmen, Siguatepeque, Honduras',1)
GO

--****************************************EMPLEADO****************************************--
INSERT INTO flet.tbEmpleados(empe_Nombres, empe_Apellidos, empe_Identidad, empe_FechaNacimiento, empe_Sexo, eciv_Id, muni_Id, empe_DireccionExacta, empe_Telefono, sucu_Id, carg_Id, empe_UsuCreacion)
VALUES	('Maria Antonia', 'Aguilar', '0101-1990-01238', '02-08-1990', 'F', '4', '0101', 'Col. El Sauce, La Ceiba', '+504 3892-0126', '1', '3', '1'),
		('Oscar', 'Blanco', '0101-1992-23743', '12-08-1992', 'M', '1', '0101', 'Col. La Esperanza, La Ceiba', '+504 7892-2839', '1', '3', '1'),
		('Lisa', 'Caballero', '0101-1989-73982', '04-08-1989', 'F', '1', '0101', 'Col. La Flor, La Ceiba', '+504 6389-2948', '1', '3', '1'),
		('José', 'Antúnez', '0101-2000-00021', '01-01-2000', 'M', '1', '0101', 'Col. Libertad, La Ceiba', '+504 8946-3846', '1', '3', '1'),
		('Lorna', 'Chaín', '0101-2002-00293', '02-05-2002', 'F', '1', '0101', 'Residencial El Toronjal, La Ceiba', '+504 3628-3826', '1', '3', '1'),
		----
		('Rafael', 'Caballero', '0501-2005-00293', '01-08-2005', 'M', '1', '0501', 'Col. Santa Marta, San Pedro Sula', '+504 6372-3792', '2', '1', '1'),
		('Melissa', 'Torres', '0501-2000-02353', '05-08-2000', 'F', '1', '0501', 'Col. El Carmen, San Pedro Sula', '+504 5739-3827', '2', '2', '1'),
		('Junior', 'Estrada', '0501-2004-07384', '07-08-2004', 'M', '2', '0501', 'Los Alamos, San Pedro Sula', '+504 3728-9303', '2', '2', '1'),
		('Jesús', 'Barreda', '0501-1975-27394', '10-08-1975', 'M', '1', '0501', 'Ticamaya, San Pedro Sula', '+504 7293-8567', '2', '2', '1'),
		('Jessica', 'Ángeles', '0501-1995-83923', '11-05-1995', 'F', '2', '0501', 'Casa Maya 3, San Pedro Sula', '+504 4729-8395', '2', '2', '1'),
		----
		('Wiliam', 'Afton', '0801-1985-03647', '10-05-1985', 'M', '1', '0801', 'Kennedy, Tegucigalpa', '+504 6473-7483', '3', '3', '1'),
		('Roberto', 'Contreras', '0801-1974-00947', '04-08-1974', 'M', '1', '0801', 'Col. Ulloa, Tegucigalpa', '+504 9858-8465', '3', '2', '1'),
		('Karen', 'Mejía', '0801-1995-09273', '03-08-1995', 'F', '1', '0801', 'Col. Divino Paraíso, Tegucigalpa', '+504 7234-8212', '3', '2', '1'),
		('Roxana', 'Martínez', '0801-1980-15263', '08-08-1980', 'F', '1', '0801', 'Col. Arturo Quezada, Tegucigalpa', '+504 7483-9837', '3', '2', '1'),
		('Julia', 'Calderón', '0801-1981-11823', '09-09-1981', 'F', '1', '0801', 'Col. Arturo Quezada, Tegucigalpa', '+504 8790-9085', '3', '2', '1'),
		----
		('Sheila', 'Torres', '0503-1981-09283', '02-09-1981', 'F', '1', '0503', 'Buena Vista, Omoa', '+504 7384-8974', '4', '2', '1'),
		('Victor', 'Mateo', '0503-1997-00829', '03-09-1997', 'M', '1', '0503', 'Corinto, Omoa', '+504 9087-9056', '4', '2', '1'),
		('Amelia', 'Lara', '0503-1998-00023', '04-09-1998', 'F', '1', '0503', 'La Venada, Omoa', '+504 9585-7456', '4', '2', '1'),
		('Laura', 'Serrano', '0503-1999-01724', '05-09-1999', 'F', '1', '0503', 'Col. La Loma, Omoa', '+504 8869-9504', '3', '2', '1'),
		('Karla', 'Menjivar', '0503-2000-72834', '06-09-2000', 'F', '1', '0503', 'Chivana, Omoa', '+504 9090-2524', '4', '2', '1'),
		----
		('Laura', 'Marano', '1804-1995-83629', '11-08-1995', 'F', '1', '1804', 'Arenas Blancas, El Progreso', '+504 7384-9382', '5', '1', '1'),
		('Ross', 'Lynch', '1804-1995-18294', '12-08-1995', 'M', '1', '1804', 'Diez Alborotos, El Progreso', '+504 9283-9472', '5', '2', '1'),
		('Timothée', 'Chalamet', '1804-1995-18200', '12-08-1995', 'M', '1', '1804', 'Diez Alborotos, El Progreso', '+504 8273-9488', '5', '2', '1'),
		('Bill', 'Kaulitz', '1804-1989-00283', '09-01-1989', 'M', '1', '1804', 'Campo Amapa, El Progreso', '+504 9984-7383', '5', '2', '1'),
		('Tom', 'Kaulitz', '1804-1989-00284', '09-01-1989', 'M', '2', '1804', 'Campo Amapa, El Progreso', '+504 9863-7482', '5', '2', '1');
		----
GO
INSERT INTO [flet].[tbTrayectos](tray_Precio ,muni_Inicio, muni_Final, tray_UsuCreacion)
VALUES	(100, '0501','0801',1),
		(100, '0501','0401',1),
		(100, '0501','0506',1),
		(100, '0501','1601',1),
		(100, '0501','1804',1),
		(100, '0501','0209',1),
		(100, '0501','0101',1),
		(100, '0501','0103',1),
		(100, '0501','0318',1),

		(100, '0801','0501' ,1),
		(100, '0801','0401' ,1),
		(100, '0801','0506' ,1),
		(100, '0801','1601' ,1),
		(100, '0801','1804' ,1),
		(100, '0801','0209' ,1),
		(100, '0801','0101' ,1),
		(100, '0801','0103' ,1),
		(100, '0801','0318' ,1)

GO
INSERT INTO [flet].[tbTrayectos](tray_Precio ,muni_Inicio, muni_Final, tray_UsuCreacion)
VALUES
		(150, '0401','0501' ,1),
		(150, '0401','0801' ,1),
		(150, '0401','0506' ,1),
		(150, '0401','1601' ,1),
		(150, '0401','1804' ,1),
		(150, '0401','0209' ,1),
		(150, '0401','0101' ,1),
		(150, '0401','0103' ,1),
		(150, '0401','0318' ,1),
			  	 
		(150, '0506','0501' ,1),
		(150, '0506','0801' ,1),
		(150, '0506','0401' ,1),
		(150, '0506','1601' ,1),
		(150, '0506','1804' ,1),
		(150, '0506','0209' ,1),
		(150, '0506','0101' ,1),
		(150, '0506','0103' ,1),
		(150, '0506','0318' ,1)

GO
INSERT INTO [flet].[tbTrayectos](tray_Precio ,muni_Inicio, muni_Final, tray_UsuCreacion)
VALUES
		(120, '1601','0501' ,1),
		(120, '1601','0801' ,1),
		(120, '1601','0401' ,1),
		(120, '1601','1804' ,1),
		(120, '1601','0506' ,1),
		(120, '1601','0209' ,1),
		(120, '1601','0101' ,1),
		(120, '1601','0103' ,1),
		(120, '1601','0318' ,1),
			 
		(120, '1804','0501' ,1),
		(120, '1804','0801' ,1),
		(120, '1804','0401' ,1),
		(120, '1804','1601' ,1),
		(120, '1804','0506' ,1),
		(120, '1804','0209' ,1),
		(120, '1804','0101' ,1),
		(120, '1804','0103' ,1),
		(120, '1804','0318' ,1)
GO
INSERT INTO [flet].[tbTrayectos](tray_Precio ,muni_Inicio, muni_Final, tray_UsuCreacion)
VALUES
		(100, '0209','0501' ,1),
		(100, '0209','0801' ,1),
		(100, '0209','0401' ,1),
		(100, '0209','1601' ,1),
		(100, '0209','0506' ,1),
		(100, '0209','1804' ,1),
		(100, '0209','0101' ,1),
		(100, '0209','0103' ,1),
		(100, '0209','0318' ,1),
		
		(100, '0101','0501' ,1),
		(100, '0101','0801' ,1),
		(100, '0101','0401' ,1),
		(100, '0101','1601' ,1),
		(100, '0101','0506' ,1),
		(100, '0101','1804' ,1),
		(100, '0101','0209' ,1),
		(100, '0101','0103' ,1),
		(100, '0101','0318' ,1)
GO
INSERT INTO [flet].[tbTrayectos](tray_Precio ,muni_Inicio, muni_Final, tray_UsuCreacion)
VALUES
		(100,'0103','0501' ,1),
		(100,'0103','0801' ,1),
		(100,'0103','0401' ,1),
		(100,'0103','1601' ,1),
		(100,'0103','0506' ,1),
		(100,'0103','1804' ,1),
		(100,'0103','0209' ,1),
		(100,'0103','0101' ,1),
		(100,'0103','0318' ,1),
		
		(100,'0318','0501' ,1),
		(100,'0318','0801' ,1),
		(100,'0318','0401' ,1),
		(100,'0318','1601' ,1),
		(100,'0318','0506' ,1),
		(100,'0318','1804' ,1),
		(100,'0318','0209' ,1),
		(100,'0318','0101' ,1),
		(100,'0318','0103' ,1)

GO

--****************************************ESTADO DEL PEDIDO****************************************--

INSERT INTO flet.tbEstadosDelPedido(estp_Nombre,estp_UsuCreacion)
VALUES
		('Pendiente',1),
		('En proceso',1),
		('En tránsito',1),
		('Entregado',1),
		('Cancelado',1)

--****************************************PEDIDO****************************************--
INSERT INTO [flet].[tbPedidos](clie_Id, muni_Origen, muni_Destino, pedi_DestinoFinal,estp_Id, pedi_UsuCreacion)
VALUES	(1,'0501','0801','Dirección: Avenida Principal 123, Colonia Bella Vista, Tegucigalpa. Referencias: Cerca del parque central, al lado del supermercado "El Sol", frente a la escuela "San José".',1,1),
		(2,'0401','0501','Dirección: Calle Principal 456, Barrio San Miguel, San Pedro Sula. Referencias: A una cuadra del parque central, cerca de la iglesia "San Juan", frente al centro comercial "La Plaza".',1,1),
		(3,'1804','0318','Dirección: Avenida Central 789, Colonia El Bosque, Siguatepeque.	Referencias: Cerca del parque central, al lado del restaurante "El Rincón del Sabor", frente a la escuela "Miguel Paz Barahona".',1,1),
		(4,'0101','1804','Dirección: Calle Principal 123, Barrio El Centro, El Progreso. Referencias: Junto al parque central, cerca de la iglesia "San Pedro", frente al mercado municipal.',1,1),
		(5,'0401','0103','Dirección: Avenida Costera 456, Colonia Playa Azul, Tela. Referencias: Cerca de la playa principal, al lado del hotel "Mar Azul", frente al restaurante "La Brisa".',1,1),
		(6,'1601','0318','Dirección: Calle Flores 789, Barrio San Francisco, Siguatepeque. Referencias: Cerca del parque central, al lado de la tienda "El Encanto", frente a la escuela "San José".',1,1),
		(7,'0103','0101','Dirección: Avenida Principal 123, Colonia Los Pinos, La Ceiba. Referencias: Cerca del malecón, al lado del supermercado "El Mar", frente al parque "La Libertad".',1,1),
		(8,'0501','1601','Dirección: Calle Principal 456, Barrio El Centro, Santa Bárbara. Referencias: Cerca del parque central, al lado del centro de salud, frente a la iglesia "San Juan".',1,1),
		(9,'0506','0501','Dirección: Avenida Roosevelt 789, Colonia El Bosque, San Pedro Sula. Referencias: Cerca del parque central, al lado del centro comercial "Mega Plaza", frente al hospital "San Pedro".',1,1),
		(10, '0501','0501','Dirección: Calle Principal 123, Colonia El Carmen, San Pedro Sula. Referencias: Cerca del parque central, al lado del supermercado "El Sol", frente a la escuela "San José".',1,1)	
GO
--****************************************PEDIDO DETALLES****************************************--
INSERT INTO [flet].[tbPedidoDetalles](pedi_Id, item_Id, pdet_Cantidad, pdet_UsuCreacion)
VALUES	(1,1,1,1),
		(1,7,1,1),
		(1,9,1,1),

		(2,3,2,1),
		(2,8,2,1),
		(2,4,2,1),
		
		(3,2,7,1),
		(3,10,5,1),
		(3,5,6,1),
		(3,12,2,1),
		(3,11,1,1),

		(4,17,1,1),

		(5,19,3,1),

		(6,25,1,1),
		(6,24,2,1),

		(7,23,2,1),
		(7,20,1,1),

		(8,14,1,1),
		(8,16,1,1),

		(9,13,2,1),
		(9,15,3,1),
		(9,18,5,1),

		(10,21,3,1),
		(10,22,4,1)

		
--****************************************FLETE****************************************--

select mun.muni_Nombre, [muni_Origen],fin.muni_Nombre, [muni_Destino],sum(item_Peso)item_Peso, sum(item_Volumen)item_Volumen
from flet.tbItems itm inner join flet.tbPedidoDetalles pdt on itm.item_Id = pdt.item_Id 
inner join flet.tbPedidos pdd on   pdd.pedi_Id = pdt.pedi_Id 
inner join gral.tbMunicipios mun on mun.muni_Id = pdd.[muni_Origen]
inner join gral.tbMunicipios fin on fin.muni_Id = pdd.[muni_Destino]
group by pdd.pedi_Id ,[muni_Origen],[muni_Destino],mun.muni_Nombre, fin.muni_Nombre

select tray_Id,mun.muni_Nombre, muni_Inicio, fin.muni_Nombre, muni_Final from [flet].[tbTrayectos] tra 
inner join gral.tbMunicipios mun on mun.muni_Id = tra.muni_Inicio
inner join gral.tbMunicipios fin on fin.muni_Id = tra.muni_Final
WHERE muni_Inicio = 62 and muni_Final = 109 or
muni_Inicio = 39 and muni_Final = 62 or
muni_Inicio = 290 and muni_Final = 36 or
muni_Inicio = 1 and muni_Final = 290 or
muni_Inicio = 39 and muni_Final = 3 or
muni_Inicio = 250 and muni_Final = 36 or
muni_Inicio = 3 and muni_Final = 1 or
muni_Inicio = 62 and muni_Final = 250 or
muni_Inicio = 67 and muni_Final = 62 or
muni_Inicio = 62 and muni_Final = 62 



INSERT INTO flet.tbFletes(vehi_Id, empe_Id, tray_Id, flet_FechaDeSalida, flet_UsuCreacion)
VALUES 
(1,1,1,	'05-08-2023',1),
(2,1,19,'05-08-2023',1), --EN PARADAS HAY QUE HACER QUE ESTE FLETE (CON LOS ID DE PEDIDO 2 Y 3) VAYA PARA TELA TMB XD (EL TRAYECTO ES 26)
(3,1,36,'05-08-2023',1), 
(4,1,69,'05-08-2023',1),
(5,1,5,	'05-08-2023',1),
(2,1,80,'05-08-2023',1),
(5,1,45,'05-08-2023',1)


INSERT INTO [flet].[tbFleteDetalles] (flet_Id, pedi_Id, fdet_UsuCreacion)
VALUES 
(1,1,1),
(2,2,1),
(2,6,1),
(3,3,1),
(4,4,1)
--****************************************FLETE DETALLES****************************************--


--ALTER TABLE [acce].[tbUsuarios]
--ADD CONSTRAINT FK_acce_tbUsuarios_flet_tbEmpleados_empe_Id FOREIGN KEY(empe_Id) REFERENCES flet.tbEmpleados(empe_Id)

--GO


----****************************************INSERTS ACCESO****************************************--
----****************************************ROLES****************************************--
--INSERT INTO acce.tbRoles (role_Nombre,role_UsuCreacion)
--VALUES	('Admin', 1),
--		('Digitador', 1),
--		('Empleado',1);
----****************************************PANTALLAS****************************************--
--INSERT INTO acce.tbPantallas (pant_Nombre, pant_Url, pant_Menu, pant_Icono, pant_UsuCreacion)
--VALUES ('Departamentos',		'/gral/Departamentos/List',			'gral','<i class="flag-icon flag-icon-hn"></i>',1),
--	   ('Estado Civiles',		'/gral/Municipios/List',			'gral','<i class="fa fa-list"></i>',1),
--	   ('Municipios',			'/gral/Municipios/List',			'gral','<i class="fa fa-tag"></i>',1),
--	   ('Tipo de Pagos',		'/gral/TiposDePago/List',			'gral','<i class="fa fa-credit-card-alt"></i>',1) ,
--	   ('Cargos',				'/gral/Cargos/List',				'gral','',1) ,

--	   ('Clientes',				'/flet/Clientes/List',				'flet','<i class="fa fa-users"></i>',1),
--	   ('Fletes',				'/flet/Fletes/List',				'flet','',1),
--	   ('Items',				'/flet/Items/List',					'flet','',1),
--	   ('Pedidos',				'/flet/Pedidos/List',				'flet','',1),
--	   ('Sucursales',			'/flet/Sucursales/List',			'flet','',1),
--	   ('Trayectos',			'/flet/Trayectos/List',				'flet','',1),
--	   ('Ubicacion por Flete',	'/flet/UbicacionPorFlete/List ',	'flet','',1),
--	   ('Estados del Pedido',	'/flet/EstadosDelPedido/List',		'flet','',1),
--	   ('Escala por Trayecto',	'/flet/EscalasPorTrayecto/List ',	'flet','',1),
--	   ('Empleados',			'/flet/Empleados/List',				'flet','<i class="fa fa-users"></i>',1),

--	   ('Modelos',				'/equi/Modelos/List',				'equi','',1),
--	   ('Marcas',				'/equi/Marcas/List',				'equi','',1),
--	   ('Vehiculos',			'/equi/Vehiculos/List',				'equi','',1),
--	   ('Tipos de Vehiculos',	'/equi/TiposDeVehiculos/List ',		'equi','<i class="fa fa-car"></i>',1),

--	   ('Usuarios',				'/acce/Usuarios/List',				'acce','',1),
--       ('Roles Por Pantalla',	'/acce/RolesPorPantalla/List ',		'acce','',1),
--	   ('Pantallas',			'/acce/Pantallas/List',				'acce','',1),
--	   ('Grafica',				'/acce/Grafica/List',				'acce','<i class="icofont icofont-chart-bar-graph"></i>',1)
--GO
	    
----****************************************ROLES POR PANTALLAS****************************************--
--INSERT INTO acce.tbPantallasPorRoles(pant_Id,role_Id , prol_UsuCreacion)
--VALUES	--Admin
--		--generales
--		(1 ,1 ,1),
--		(2 ,1 ,1),
--		(3 ,1 ,1),
--		(4 ,1 ,1),
--		(5 ,1 ,1),
--		--fletes
--		(6 ,1 ,1),
--		(7 ,1 ,1),
--		(8 ,1 ,1),
--		(9 ,1 ,1),
--		(10,1 ,1),
--		(11,1 ,1),
--		(12,1 ,1),
--		(13,1 ,1),
--		(14,1 ,1),
--		(15,1 ,1),
--		--equipo
--		(16,1 ,1),
--		(17,1 ,1),
--		(18,1 ,1),
--		(19,1 ,1),
--		--acceso
--		(20,1 ,1),
--		(21,1 ,1),
--		(22,1 ,1),
--		(23,1 ,1),

--		--Admin
--		--generales
--		(1 ,2 ,1),
--		(2 ,2 ,1),
--		(3 ,2 ,1),
--		(4 ,2 ,1),
--		(5 ,2 ,1),
--		--fl2tes
--		(6 ,2 ,1),
--		(7 ,2 ,1),
--		(8 ,2 ,1),
--		(9 ,2 ,1),
--		(10,2 ,1),
--		(11,2 ,1),
--		(12,2 ,1),
--		(13,2 ,1),
--		(14,2 ,1),
--		(15,2 ,1),
--		--eq2ipo
--		(16,2 ,1),
--		(17,2 ,1),
--		(18,2 ,1),
--		(19,2 ,1),
--		--ac2eso
--		(20,2 ,1),
--		(21,2 ,1),
--		(22,2 ,1),
--		(23,2 ,1),

--		--Digitador
--		--generales
--		(1 ,3,1),
--		(2 ,3,1),
--		(3 ,3,1),
--		(4 ,3,1),
--		(5 ,3,1),
--		--fl3es
--		(6 ,3,1),
--		(7 ,3,1),
--		(8 ,3,1),
--		(9 ,3,1),
--		(10,3,1),
--		(11,3,1),
--		(12,3,1),
--		(13,3,1),
--		(14,3,1),
--		(15,3,1),
--		--eq3po
--		(16,3,1),
--		(17,3,1),
--		(18,3,1),
--		(19,3,1),

--		--Empleado
--		--generales
--		(1 ,4 ,1),
--		(2 ,4 ,1),
--		(3 ,4 ,1),
--		(4 ,4 ,1),
--		(5 ,4 ,1),
--		--eq4ipo
--		(16,4 ,1),
--		(17,4 ,1),
--		(18,4 ,1),
--		(19,4 ,1)
--GO

/*
POR SI NO FUNCIONA


SELECT * FROM gral.tbDepartamentos


SELECT * FROM gral.tbMunicipios
SELECT * FROM gral.tbEstadosCiviles
		SELECT * FROM gral.tbCargos
		SELECT * FROM gral.tbMetodosdePago
		SELECT * FROM equi.tbMarcas
		SELECT * FROM equi.tbTipoDeVehiculo
		SELECT * FROM equi.tbModelos
		SELECT * FROM equi.tbVehiculos
		SELECT * FROM flet.tbClientes
		SELECT * FROM flet.tbItems
		SELECT * FROM flet.tbSucursales
		SELECT * FROM flet.tbEmpleados
		SELECT * FROM flet.tbTrayectos
		SELECT * FROM flet.tbEstadosDelPedido		
		SELECT * FROM flet.[tbPedidos]
				SELECT * FROM flet.[tbPedidoDetalles]
				select * from acce.tbRoles
				
*/