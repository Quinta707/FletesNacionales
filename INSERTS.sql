/*
USE master
DROP DATABASE FletesNacionales
*/

USE FletesNacionales


--****************************************INSERTS GENERALES****************************************--
--****************************************DEPARTAMENTOS****************************************--
INSERT INTO gral.tbDepartamentos(depa_Codigo, depa_Nombre, depa_UsuCreacion, depa_FechaCreacion, depa_UsuModificacion, depa_FechaModificacion)
VALUES	('01','Atlántida', 1, GETDATE(), NULL, NULL),
		('02','Colón', 1, GETDATE(), NULL, NULL),
		('03','Comayagua',  1, GETDATE(), NULL,NULL),
		('04','Copán',  1, GETDATE(), NULL, NULL),
		('05','Cortés',  1, GETDATE(), NULL, NULL),
		('06','Choluteca',  1, GETDATE(), NULL, NULL),
		('07','El Paraíso',  1, GETDATE(), NULL, NULL),
		('08','Francisco Morazán',  1, GETDATE(), NULL, NULL),
		('09','Gracias a Dios',  1, GETDATE(), NULL, NULL),
		('10','Intibucá',  1, GETDATE(), NULL, NULL),
		('11','Islas de la Bahía',  1, GETDATE(), NULL, NULL),
		('12','La Paz',  1, GETDATE(), NULL, NULL),
		('13','Lempira',  1, GETDATE(), NULL,NULL ),
		('14','Ocotepeque',  1, GETDATE(), NULL, NULL),
		('15','Olancho',  1, GETDATE(), NULL, NULL),
		('16','Santa Bárbara',  1, GETDATE(), NULL, NULL),
		('17','Valle',  1, GETDATE(), NULL, NULL),
		('18','Yoro', 1, GETDATE(), NULL, NULL);


GO

--****************************************MUNICIPIOS****************************************--
INSERT INTO gral.tbMunicipios(muni_Codigo, muni_Nombre, depa_Codigo,muni_Estado, muni_UsuCreacion, muni_FechaCreacion, muni_UsuModificacion, muni_FechaModificacion)
VALUES	('0101','La Ceiba','01', '1', 1, GETDATE(), NULL, GETDATE()),
		('0102','El Porvenir','01', '1', 1, GETDATE(), NULL, GETDATE()),
		('0103','Tela', '01','1', 1, GETDATE(), NULL, GETDATE()),
		('0104','Jutiapa', '01','1', 1, GETDATE(), NULL, GETDATE()),
		('0105','La Masica','01', '1', 1, GETDATE(), NULL, GETDATE()),
		('0106','San Francisco','01', '1', 1, GETDATE(), NULL, GETDATE()),
		('0107','Arizona','01', '1', 1, GETDATE(), NULL, GETDATE()),
		('0108','Esparta','01', '1', 1, GETDATE(), NULL, GETDATE()),
	

		('0201','Trujillo','02', '1', 1, GETDATE(), NULL, GETDATE()),
		('0202','Balfate','02', '1', 1, GETDATE(), NULL, GETDATE()),
		('0203','Iriona','02', '1', 1, GETDATE(), NULL, GETDATE()),
		('0204','Limón', '02','1', 1, GETDATE(), NULL, GETDATE()),
		('0205','Sab�','02' ,'1', 1, GETDATE(), NULL, GETDATE()),
		('0206','Santa Fe','02', '1', 1, GETDATE(), NULL, GETDATE()),
		('0207','Santa Rosa de Agu�n','02', '1', 1, GETDATE(), NULL, GETDATE()),
		('0208','Sonaguera','02', '1', 1, GETDATE(), NULL, GETDATE()),
		('0209','Tocoa', '02','1', 1, GETDATE(), NULL, GETDATE()),
		('0210','Bonito Oriental', '02','1', 1, GETDATE(), NULL, GETDATE()),


		(	'0301',		'Comayagua', '03','1', 1, GETDATE(), NULL, GETDATE()),
		(	'0302',		'Ajuterique','03', '1', 1, GETDATE(), NULL, GETDATE()),
		(	'0303',		'El Rosario', '03','1', 1, GETDATE(), NULL, GETDATE()),
		(	'0304',		'Esqu�as','03', '1', 1, GETDATE(), NULL, GETDATE()),
		(	'0305',		'Humuya','03', '1', 1, GETDATE(), NULL, GETDATE()),
		(	'0306',		'La Libertad', '03','1', 1, GETDATE(), NULL, GETDATE()),
		(	'0307',		'Laman�', '03','1', 1, GETDATE(), NULL, GETDATE()),
		(	'0308',		'La Trinidad', '03','1', 1, GETDATE(), NULL, GETDATE()),
		(	'0309',		'Lejaman�','03', '1', 1, GETDATE(), NULL, GETDATE()),
		(	'0310',		'Me�mbar','03', '1', 1, GETDATE(), NULL, GETDATE()),
		(	'0311',		'Minas de Oro','03', '1', 1, GETDATE(), NULL, GETDATE()),
		(	'0312',		'Ojos de Agua','03', '1', 1, GETDATE(), NULL, GETDATE()),
		(	'0313',		'San Jer�nimo', '03','1', 1, GETDATE(), NULL, GETDATE()),
		(	'0314',		'San Jos� de Comayagua', '03','1', 1, GETDATE(), NULL, GETDATE()),
		(	'0315',		'San Jos� del Potrero','03', '1', 1, GETDATE(), NULL, GETDATE()),
		(	'0316',		'San Luis', '03','1', 1, GETDATE(), NULL, GETDATE()),
		(	'0317',		'San Sebasti�n','03', '1', 1, GETDATE(), NULL, GETDATE()),
		(	'0318',		'Siguatepeque', '03','1', 1, GETDATE(), NULL, GETDATE()),
		(	'0319',		'Villa de San Antonio', '03','1', 1, GETDATE(), NULL, GETDATE()),
		(	'0320',		'Las Lajas','03', '1', 1, GETDATE(), NULL, GETDATE()),

		('0401','Santa Rosa de Cop�n','04', '1', 1, GETDATE(), NULL, GETDATE()),
		('0402','Caba�as', '04','1', 1, GETDATE(), NULL, GETDATE()),
		('0403','Concepci�n','04', '1', 1, GETDATE(), NULL, GETDATE()),
		('0404','Cop�n Ruinas', '04','1', 1, GETDATE(), NULL, GETDATE()),
		('0405','Corqu�n', '04','1', 1, GETDATE(), NULL, GETDATE()),
		('0406','Cucuyagua', '04','1', 1, GETDATE(), NULL, GETDATE()),
		('0407','Dolores','04', '1', 1, GETDATE(), NULL, GETDATE()),
		('0408','Dulce Nombre','04', '1', 1, GETDATE(), NULL, GETDATE()),
		('0409','El Para�so','04', '1', 1, GETDATE(), NULL, GETDATE()),
		('0410','Florida','04', '1', 1, GETDATE(), NULL, GETDATE()),
		('0411','La Jigua','04', '1', 1, GETDATE(), NULL, GETDATE()),
		('0412','La Uni�n','04', '1', 1, GETDATE(), NULL, GETDATE()),
		('0413','Nueva Arcadia','04', '1', 1, GETDATE(), NULL, GETDATE()),
		('0414','San Agust�n', '04','1', 1, GETDATE(), NULL, GETDATE()),
		('0415','San Antonio', '04','1', 1, GETDATE(), NULL, GETDATE()),
		('0416','San Jer�nimo','04', '1', 1, GETDATE(), NULL, GETDATE()),
		('0417','San Jos�','04', '1', 1, GETDATE(), NULL, GETDATE()),
		('0418','San Juan de Opoa','04', '1', 1, GETDATE(), NULL, GETDATE()),
		('0419','San Nicol�s', '04','1', 1, GETDATE(), NULL, GETDATE()),
		('0420','San Pedro','04', '1', 1, GETDATE(), NULL, GETDATE()),
		('0421','Santa Rita','04', '1', 1, GETDATE(), NULL, GETDATE()),
		('0422','Trinidad de Cop�n','04', '1', 1, GETDATE(), NULL, GETDATE()),
		('0423','Veracruz', '04','1', 1, GETDATE(), NULL, GETDATE()),


		('0501','San Pedro Sula', '05','1', 1, GETDATE(), NULL, GETDATE()),
		('0502','Choloma','05', '1', 1, GETDATE(), NULL, GETDATE()),
		('0503','Omoa', '05','1', 1, GETDATE(), NULL, GETDATE()),
		('0504','Pimienta','05', '1', 1, GETDATE(), NULL, GETDATE()),
		('0505','Potrerillos','05', '1', 1, GETDATE(), NULL, GETDATE()),
		('0506','Puerto Cort�s','05', '1', 1, GETDATE(), NULL, GETDATE()),
		('0507','San Antonio de Cort�s', '05','1', 1, GETDATE(), NULL, GETDATE()),
		('0508','San Francisco de Yojoa','05', '1', 1, GETDATE(), NULL, GETDATE()),
		('0509','San Manuel','05', '1', 1, GETDATE(), NULL, GETDATE()),
		('0510','Santa Cruz de Yojoa','05', '1', 1, GETDATE(), NULL, GETDATE()),
		('0511','Villanueva', '05','1', 1, GETDATE(), NULL, GETDATE()),
		('0512','La Lima','05', '1', 1, GETDATE(), NULL, GETDATE()),


		('0601','Choluteca', '06','1', 1, GETDATE(), NULL, GETDATE()),
		('0602','Apacilagua', '06','1', 1, GETDATE(), NULL, GETDATE()),
		('0603','Concepci�n de Mar�a','06', '1', 1, GETDATE(), NULL, GETDATE()),
		('0604','Duyure','06', '1', 1, GETDATE(), NULL, GETDATE()),
		('0605','El Corpus', '06','1', 1, GETDATE(), NULL, GETDATE()),
		('0606','El Triunfo', '06','1', 1, GETDATE(), NULL, GETDATE()),
		('0607','Marcovia','06', '1', 1, GETDATE(), NULL, GETDATE()),
		('0608','Morolica','06', '1', 1, GETDATE(), NULL, GETDATE()),
		('0609','Namasig�e', '06','1', 1, GETDATE(), NULL, GETDATE()),
		('0610','Orocuina', '06','1', 1, GETDATE(), NULL, GETDATE()),
		('0611','Pespire', '06','1', 1, GETDATE(), NULL, GETDATE()),
		('0612','San Antonio de Flores','06', '1', 1, GETDATE(), NULL, GETDATE()),
		('0613','San Isidro', '06','1', 1, GETDATE(), NULL, GETDATE()),
		('0614','San Jos�','06', '1', 1, GETDATE(), NULL, GETDATE()),
		('0615','San Marcos de Col�n','06', '1', 1, GETDATE(), NULL, GETDATE()),
		('0616','Santa Ana de Yusguare','06', '1', 1, GETDATE(), NULL, GETDATE()),

		

		('0701', 'Yuscar�n','07', '1', 1, GETDATE(), NULL, GETDATE()),
		('0702', 'Alauca', '07','1', 1, GETDATE(), NULL, GETDATE()),
		('0703', 'Danl�', '07','1', 1, GETDATE(), NULL, GETDATE()),
		('0704', 'El Para�so','07', '1', 1, GETDATE(), NULL, GETDATE()),
		('0705', 'G�inope', '07','1', 1, GETDATE(), NULL, GETDATE()),
		('0706', 'Jacaleapa', '07','1', 1, GETDATE(), NULL, GETDATE()),
		('0707', 'Liure','07', '1', 1, GETDATE(), NULL, GETDATE()),
		('0708', 'Morocel�', '07','1', 1, GETDATE(), NULL, GETDATE()),
		('0709', 'Oropol�', '07','1', 1, GETDATE(), NULL, GETDATE()),
		('0710', 'Potrerillos', '07','1', 1, GETDATE(), NULL, GETDATE()),
		('0711', 'San Antonio de Flores','07', '1', 1, GETDATE(), NULL, GETDATE()),
		('0712', 'San Lucas', '07','1', 1, GETDATE(), NULL, GETDATE()),
		('0713', 'San Mat�as', '07','1', 1, GETDATE(), NULL, GETDATE()),
		('0714', 'Soledad', '07','1', 1, GETDATE(), NULL, GETDATE()),
		('0715', 'Teupasenti', '07','1', 1, GETDATE(), NULL, GETDATE()),
		('0716', 'Texiguat', '07','1', 1, GETDATE(), NULL, GETDATE()),
		('0717', 'Vado Ancho', '07','1', 1, GETDATE(), NULL, GETDATE()),
		('0718', 'Yauyupe', '07','1', 1, GETDATE(), NULL, GETDATE()),
		('0719', 'Trojes', '07','1', 1, GETDATE(), NULL, GETDATE()),


		('0801', 'Distrito Central','08',  '1', 1, GETDATE(), NULL, GETDATE()),
		('0802', 'Alubar�n','08',  '1', 1, GETDATE(), NULL, GETDATE()),
		( '0803', 'Cedros', '08', '1', 1, GETDATE(), NULL, GETDATE()),
		( '0804', 'Curar�n', '08', '1', 1, GETDATE(), NULL, GETDATE()),
		( '0805', 'El Porvenir', '08', '1', 1, GETDATE(), NULL, GETDATE()),
		( '0806', 'Guaimaca', '08', '1', 1, GETDATE(), NULL, GETDATE()),
		( '0807', 'La Libertad', '08', '1', 1, GETDATE(), NULL, GETDATE()),
		( '0808', 'La Venta', '08', '1', 1, GETDATE(), NULL, GETDATE()),
		( '0809', 'Lepaterique', '08', '1', 1, GETDATE(), NULL, GETDATE()),
		( '0810', 'Maraita','08',  '1', 1, GETDATE(), NULL, GETDATE()),
		( '0811', 'Marale', '08', '1', 1, GETDATE(), NULL, GETDATE()),
		( '0812', 'Nueva Armenia', '08', '1', 1, GETDATE(), NULL, GETDATE()),
		( '0813', 'Ojojona','08',  '1', 1, GETDATE(), NULL, GETDATE()),
		( '0814', 'Orica','08',  '1', 1, GETDATE(), NULL, GETDATE()),
		( '0815', 'Reitoca','08',  '1', 1, GETDATE(), NULL, GETDATE()),
		( '0816', 'Sabanagrande','08',  '1', 1, GETDATE(), NULL, GETDATE()),
		( '0817', 'San Antonio de Oriente','08',  '1', 1, GETDATE(), NULL, GETDATE()),
		( '0818', 'San Buenaventura', '08', '1', 1, GETDATE(), NULL, GETDATE()),
		( '0819', 'San Ignacio', '08', '1', 1, GETDATE(), NULL, GETDATE()),
		( '0820', 'San Juan de Flores','08',  '1', 1, GETDATE(), NULL, GETDATE()),
		( '0821', 'San Miguelito','08',  '1', 1, GETDATE(), NULL, GETDATE()),
		( '0822', 'Santa Ana','08',  '1', 1, GETDATE(), NULL, GETDATE()),
		( '0823', 'Santa Luc�a','08',  '1', 1, GETDATE(), NULL, GETDATE()),
		( '0824', 'Talanga','08',  '1', 1, GETDATE(), NULL, GETDATE()),
		( '0825', 'Tatumbla', '08', '1', 1, GETDATE(), NULL, GETDATE()),
		( '0826', 'Valle de �ngeles','08',  '1', 1, GETDATE(), NULL, GETDATE()),
		( '0827', 'Villa de San Francisco','08',  '1', 1, GETDATE(), NULL, GETDATE()),
		( '0828', 'Vallecillo', '08', '1', 1, GETDATE(), NULL, GETDATE()),
		
		('0901', 'Puerto Lempira','09',  '1', 1, GETDATE(), NULL, GETDATE()),
		('0902', 'Brus Laguna', '09', '1', 1, GETDATE(), NULL, GETDATE()),
		('0903', 'Ahuas','09',  '1', 1, GETDATE(), NULL, GETDATE()),
		('0904', 'Juan Francisco Bulnes','09',  '1', 1, GETDATE(), NULL, GETDATE()),
		('0905', 'Ram�n Villeda Morales', '09', '1', 1, GETDATE(), NULL, GETDATE()),
		('0906', 'Wampusirpe','09',  '1', 1, GETDATE(), NULL, GETDATE()),
		
		( '1001', 'La Esperanza','10', '1', 1, GETDATE(), NULL, GETDATE()),
		('1002', 'Camasca', '10','1', 1, GETDATE(), NULL, GETDATE()),
		('1003', 'Colomoncagua', '10','1', 1, GETDATE(), NULL, GETDATE()),
		('1004', 'Concepci�n', '10','1', 1, GETDATE(), NULL, GETDATE()),
		('1005', 'Dolores', '10','1', 1, GETDATE(), NULL, GETDATE()),
		('1006', 'Intibuc�', '10','1', 1, GETDATE(), NULL, GETDATE()),
		('1007', 'Jes�s de Otoro', '10','1', 1, GETDATE(), NULL, GETDATE()),
		('1008', 'Magdalena','10', '1', 1, GETDATE(), NULL, GETDATE()),
		('1009', 'Masaguara', '10','1', 1, GETDATE(), NULL, GETDATE()),
		('1010', 'San Antonio', '10','1', 1, GETDATE(), NULL, GETDATE()),
		('1011', 'San Isidro', '10','1', 1, GETDATE(), NULL, GETDATE()),
		('1012', 'San Juan', '10','1', 1, GETDATE(), NULL, GETDATE()),
		('1013', 'San Marcos de la Sierra','10', '1', 1, GETDATE(), NULL, GETDATE()),
		('1014', 'San Miguel Guancapla', '10','1', 1, GETDATE(), NULL, GETDATE()),
		('1015', 'Santa Luc�a', '10','1', 1, GETDATE(), NULL, GETDATE()),
		('1016', 'Yamaranguila', '10','1', 1, GETDATE(), NULL, GETDATE()),
		('1017', 'San Francisco de Opalaca','10', '1', 1, GETDATE(), NULL, GETDATE()),


		('1101', 'Roat�n','11',  '1', 1, GETDATE(), NULL, GETDATE()),
		('1102', 'Guanaja','11',  '1', 1, GETDATE(), NULL, GETDATE()),
		('1103', 'Jos� Santos Guardiola','11',  '1', 1, GETDATE(), NULL, GETDATE()),
		('1104', 'Utila','11',  '1', 1, GETDATE(), NULL, GETDATE()),


		( '1201', 'La Paz', '12','1', 1, GETDATE(), NULL, GETDATE()),
		( '1202', 'Aguanqueterique', '12','1', 1, GETDATE(), NULL, GETDATE()),
		( '1203', 'Caba�as', '12','1', 1, GETDATE(), NULL, GETDATE()),
		( '1204', 'Cane', '12','1', 1, GETDATE(), NULL, GETDATE()),
		( '1205', 'Chinacla', '12','1', 1, GETDATE(), NULL, GETDATE()),
		( '1206', 'Guajiquiro','12', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1207', 'Lauterique','12', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1208', 'Marcala', '12','1', 1, GETDATE(), NULL, GETDATE()),
		( '1209', 'Mercedes de Oriente','12', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1210', 'Opatoro','12', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1211', 'San Antonio del Norte','12', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1212', 'San Jos�','12', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1213', 'San Juan','12', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1214', 'San Pedro de Tutule','12', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1215', 'Santa Ana','12', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1216', 'Santa Elena', '12','1', 1, GETDATE(), NULL, GETDATE()),
		( '1217', 'Santa Mar�a', '12','1', 1, GETDATE(), NULL, GETDATE()),
		( '1218', 'Santiago de Puringla','12', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1219', 'Yarula', '12','1', 1, GETDATE(), NULL, GETDATE()),


		( '1301', 'Gracias','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1302', 'Bel�n', '13','1', 1, GETDATE(), NULL, GETDATE()),
		( '1303', 'Candelaria','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1304', 'Cololaca','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1305', 'Erandique','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1306', 'Gualcince','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1307', 'Guarita','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1308', 'La Campa', '13','1', 1, GETDATE(), NULL, GETDATE()),
		( '1309', 'La Iguala','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1310', 'Las Flores','13','1', 1, GETDATE(), NULL, GETDATE()),
		( '1311', 'La Uni�n','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1312', 'La Virtud','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1313', 'Lepaera','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1314', 'Mapulaca','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1315', 'Piraera', '13','1', 1, GETDATE(), NULL, GETDATE()),
		( '1316', 'San Andr�s','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1317', 'San Francisco', '13','1', 1, GETDATE(), NULL, GETDATE()),
		( '1318', 'San Juan Guarita', '13','1', 1, GETDATE(), NULL, GETDATE()),
		( '1319', 'San Manuel Colohete', '13','1', 1, GETDATE(), NULL, GETDATE()),
		( '1320', 'San Rafael','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1321', 'San Sebasti�n','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1322', 'Santa Cruz','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1323', 'Talgua','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1324', 'Tambla','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1325', 'Tomal�','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1326', 'Valladolid','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1327', 'Virginia','13', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1328', 'San Marcos de Caiqu�n','13', '1', 1, GETDATE(), NULL, GETDATE()),


		( '1401', 'Ocotepeque','14', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1402', 'Bel�n Gualcho','14', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1403', 'Concepci�n','14', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1404', 'Dolores Merend�n', '14','1', 1, GETDATE(), NULL, GETDATE()),
		( '1405', 'Fraternidad', '14','1', 1, GETDATE(), NULL, GETDATE()),
		( '1406', 'La Encarnaci�n','14', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1407', 'La Labor','14', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1408', 'Lucerna', '14','1', 1, GETDATE(), NULL, GETDATE()),
		( '1409', 'Mercedes', '14','1', 1, GETDATE(), NULL, GETDATE()),
		( '1410', 'San Fernando', '14','1', 1, GETDATE(), NULL, GETDATE()),
		( '1411', 'San Francisco del Valle','14', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1412', 'San Jorge','14', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1413', 'San Marcos', '14','1', 1, GETDATE(), NULL, GETDATE()),
		( '1414', 'Santa Fe', '14','1', 1, GETDATE(), NULL, GETDATE()),
		( '1415', 'Sensenti', '14','1', 1, GETDATE(), NULL, GETDATE()),
		( '1416', 'Sinuapa', '14','1', 1, GETDATE(), NULL, GETDATE()),


		( '1501', 'Juticalpa','15', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1502', 'Campamento','15', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1503', 'Catacamas','15', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1504', 'Concordia','15', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1505', 'Dulce Nombre de Culm�','15', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1506', 'El Rosario', '15','1', 1, GETDATE(), NULL, GETDATE()),
		( '1507', 'Esquipulas del Norte','15', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1508', 'Gualaco','15', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1509', 'Guarizama', '15','1', 1, GETDATE(), NULL, GETDATE()),
		( '1510', 'Guata','15', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1511', 'Guayape','15', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1512', 'Jano', '15','1', 1, GETDATE(), NULL, GETDATE()),
		( '1513', 'La Uni�n','15', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1514', 'Mangulile','15', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1515', 'Manto','15', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1516', 'Salam�', '15','1', 1, GETDATE(), NULL, GETDATE()),
		( '1517', 'San Esteban', '15','1', 1, GETDATE(), NULL, GETDATE()),
		( '1518', 'San Francisco de Becerra','15', '1',1, GETDATE(), NULL, GETDATE()),
		( '1519', 'San Francisco de la Paz','15', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1520', 'Santa Mar�a del Real','15', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1521', 'Silca', '15','1', 1, GETDATE(), NULL, GETDATE()),
		( '1522', 'Yoc�n','15', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1523', 'Patuca','15','1', 1, GETDATE(), NULL, GETDATE()),


		( '1601' , 'Santa B�rbara', '16','1', 1, GETDATE(), NULL, GETDATE()),
		( '1602' , 'Arada', '16','1', 1, GETDATE(), NULL, GETDATE()),
		( '1603' , 'Atima','16', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1604' , 'Azacualpa','16', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1605' , 'Ceguaca', '16','1', 1, GETDATE(), NULL, GETDATE()),
		( '1606' , 'Concepci�n del Norte', '16','1', 1, GETDATE(), NULL, GETDATE()),
		( '1607' , 'Concepci�n del Sur','16', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1608' , 'Chinda','16', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1609' , 'El N�spero','16', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1610' , 'Gualala','16', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1611' , 'Ilama','16', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1612' , 'Las Vegas','16', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1613' , 'Macuelizo', '16','1', 1, GETDATE(), NULL, GETDATE()),
		( '1614' , 'Naranjito', '16','1', 1, GETDATE(), NULL, GETDATE()),
		( '1615' , 'Nuevo Celilac', '16','1', 1, GETDATE(), NULL, GETDATE()),
		( '1616' , 'Nueva Frontera','16', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1617' , 'Petoa','16', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1618' , 'Protecci�n','16', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1619' , 'Quimist�n','16', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1620' , 'San Francisco de Ojuera', '16','1', 1, GETDATE(), NULL, GETDATE()),
		( '1621' , 'San Jos� de las Colinas','16', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1622' , 'San Luis', '16','1', 1, GETDATE(), NULL, GETDATE()),
		( '1623' , 'San Marcos', '16','1', 1, GETDATE(), NULL, GETDATE()),
		( '1624' , 'San Nicol�s', '16','1', 1, GETDATE(), NULL, GETDATE()),
		( '1625' , 'San Pedro Zacapa','16', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1626' , 'San Vicente Centenario','16', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1627' , 'Santa Rita','16', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1628' , 'Trinidad','16', '1', 1, GETDATE(), NULL, GETDATE()),


		( '1701', 'Nacaome','17', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1702', 'Alianza','17', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1703', 'Amapala', '17','1', 1, GETDATE(), NULL, GETDATE()),
		( '1704', 'Aramecina', '17','1', 1, GETDATE(), NULL, GETDATE()),
		( '1705', 'Caridad','17', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1706', 'Goascor�n', '17','1', 1, GETDATE(), NULL, GETDATE()),
		( '1707', 'Langue','17', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1708', 'San Francisco de Coray','17', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1709', 'San Lorenzo', '17','1', 1, GETDATE(), NULL, GETDATE()),


		( '1801', 'Yoro','18', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1802', 'Arenal', '18','1', 1, GETDATE(), NULL, GETDATE()),
		( '1803', 'El Negrito', '18','1', 1, GETDATE(), NULL, GETDATE()),
		( '1804', 'El Progreso','18', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1805', 'Joc�n','18', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1806', 'Morazán', '18','1', 1, GETDATE(), NULL, GETDATE()),
		( '1807', 'Olanchito', '18','1', 1, GETDATE(), NULL, GETDATE()),
		( '1808', 'Santa Rita','18', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1809', 'Sulaco','18', '1', 1, GETDATE(), NULL, GETDATE()),
		( '1810', 'Victoria','18', '1', 1, GETDATE(), NULL, GETDATE()),
		('1811', 'Yorito', '18','1', 1, GETDATE(), NULL, GETDATE());

GO



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
		('Dependiente', '1');

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
	   ('Camaro',1,2,1)

GO
--****************************************VEHICULO****************************************--

SELECT mode_Nombre, marc_Id, tdv.tipv_Id, tipv_Descripcion FROM equi.tbModelos mdl INNER JOIN equi.tbTipoDeVehiculo tdv on mdl.tipv_Id = tdv.tipv_Id
GO

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

INSERT INTO flet.tbClientes(clie_Nombres, clie_Apellidos, clie_Identidad, clie_FechaNacimiento, clie_Sexo, eciv_Id, muni_Codigo, clie_DireccionExacta, clie_Telefono, clie_UsuCreacion)
VALUES	('Cristian', 'Aguilar', '0501-2004-98213', '02-02-2004', 'M', '1522', '1804', 'Sps', '+504 8989-6734', '1'),
		('Esdra', 'Cerna', '1904-1989-67251', '04-20-1989', 'F', '1', '1811', 'Sps',  '+504 9341-9097', '1'),
		('Sarai', 'Quintanilla', '1109-1990-62781', '12-15-1990', 'F', '1522', '1804', 'Sps',  '+504 9123-5543', '1'),
		('Marco', 'Torrez', '1109-1998-28192', '09-12-1998', 'M', '1', '1804', 'Sps',  '+504 8908-5463', '1'),
		('Celina', 'Arias', '0912-1990-64782', '09-12-1990', 'F', '1', '1624', 'Sps',  '+504 9657-7483', '1'),
		('Luis', 'Chicas', '0910-1992-98128', '09-27-1992', 'M', '1', '1302', 'Sps',  '+504 9834-5621', '1'),
		('Angie', 'Andino', '0912-1990-28739', '05-21-1990', 'F', '1', '1624', 'Sps',  '+504 9064-7869', '1'),
		('Nelson', 'Umaña', '1102-1989-00090', '02-10-1989', 'M', '1', '1612', 'Sps',  '+504 9345-5161', '1'),
		('Marbella', 'Gómez', '0815-1997-89023', '09-02-1997', 'F', '1', '1804', 'Sps',  '+504 9809-5461', '1'),
		('Carlos', 'Amaya', '0914-1995-67281', '09-05-1995', 'M', '1', '1612', 'Sps',  '+504 9109-6573', '1'),
		('Dayana', 'Erazo', '1805-1996-78934', '03-21-1995', 'F', '1', '1612', 'Sps',  '+504 9563-7381', '1'),
		('Jasson', 'Zaldívar', '0912-1998-56271', '09-21-1998', 'M', '1', '1302', 'Sps',  '+504 9100-7584', '1'),
		('Marlin', 'Guzmán', '0213-1994-56721', '10-07-1994', 'F', '1', '1626', 'Sps',  '+504 9822-5216', '1'),
		('Yoner', 'Zaldívar', '0913-1992-45162', '09-25-1992', 'M', '1', '1626', 'Sps',  '+504 8145-6627', '1'),
		('Juan', 'Sagastume', '0914-1998-20192', '09-07-1988', 'M', '1', '1302', 'Sps',  '+504 9203-8749', '1'),
		('Anthony', 'Leiva', '0415-1989-62592', '11-03-1989', 'M', '1', '1626', 'Sps',  '+504 9631-7521', '1'),
		('Paola', 'Decas', '0914-1996-78291', '09-23-1996', 'F', '1', '1302', 'Sps',  '+504 9561-2331', '1'),
		('Caleb', 'Benítez', '1401-1990-78676', '03-27-1990', 'M', '1', '0509', 'Sps',  '+504 9521-5547', '1'),
		('Exibia', 'Bueso', '0314-1998-00989', '02-15-1998', 'F', '1', '0505', 'Sps',  '+504 9312-7584', '1'),
		('Carlos', 'Herrera', '0314-1990-62712', '04-22-1990', 'M', '1', '0504', 'Sps',  '+504 9623-9956', '1'),
		('Ana', 'Fajardo', '0913-1990-92738', '09-23-1998', 'F', '1', '0509', 'Sps',  '+504 9027-8867', '1');

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
INSERT INTO flet.tbSucursales (sucu_Nombre, muni_Codigo, sucu_Direccion, sucu_UsuCreacion)
VALUES	('Fletes Horizon San Pedro Sula','0501','123 Calle Ficticia, Barrio Imaginario, San Pedro Sula, Honduras',1),
		('Fletes Horizon Tegucigalpa','0801','Avenida Ejemplo 123, Colonia Imaginaria, Tegucigalpa, Honduras',1),
		('Fletes Horizon Santa Rosa De Copan','0401','Calle Ficticia 456, Barrio Imaginario, Santa Rosa de Copán, Honduras',1),
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
VALUES	('Maria Antonia', 'Aguilar', '0101-1990-01238', '02-16-1990', 'F', '4', '0101', 'Col. El Sauce, La Ceiba', '+504 3892-0126', '1', '1', '1'),
		('Oscar', 'Blanco', '0101-1992-23743', '12-30-1992', 'M', '1', '0101', 'Col. La Esperanza, La Ceiba', '+504 7892-2839', '1', '2', '1'),
		('Lisa', 'Caballero', '0101-1989-73982', '04-25-1989', 'F', '1', '0101', 'Col. La Flor, La Ceiba', '+504 6389-2948', '1', '2', '1'),
		('José', 'Antúnez', '0101-2000-00021', '01-01-2000', 'M', '1', '0101', 'Col. Libertad, La Ceiba', '+504 8946-3846', '1', '2', '1'),
		('Lorna', 'Chaín', '0101-2002-00293', '02-05-2002', 'F', '1', '0101', 'Residencial El Toronjal, La Ceiba', '+504 3628-3826', '1', '2', '1'),
		----
		('Rafael', 'Caballero', '0501-2005-00293', '01-13-2005', 'M', '1', '0501', 'Col. Santa Marta, San Pedro Sula', '+504 6372-3792', '2', '1', '1'),
		('Melissa', 'Torres', '0501-2000-02353', '05-10-2000', 'F', '1', '0501', 'Col. El Carmen, San Pedro Sula', '+504 5739-3827', '2', '2', '1'),
		('Junior', 'Estrada', '0501-2004-07384', '07-28-2004', 'M', '2', '0501', 'Los Alamos, San Pedro Sula', '+504 3728-9303', '2', '2', '1'),
		('Jesús', 'Barreda', '0501-1975-27394', '10-10-1975', 'M', '1', '0501', 'Ticamaya, San Pedro Sula', '+504 7293-8567', '2', '2', '1'),
		('Jessica', 'Ángeles', '0501-1995-83923', '11-05-1995', 'F', '2', '0501', 'Casa Maya 3, San Pedro Sula', '+504 4729-8395', '2', '2', '1'),
		----
		('Wiliam', 'Afton', '0801-1985-03647', '10-05-1985', 'M', '1', '0801', 'Kennedy, Tegucigalpa', '+504 6473-7483', '3', '1', '1'),
		('Roberto', 'Contreras', '0801-1974-00947', '04-15-1974', 'M', '1', '0801', 'Col. Ulloa, Tegucigalpa', '+504 9858-8465', '3', '2', '1'),
		('Karen', 'Mejía', '0801-1995-09273', '03-25-1995', 'F', '1', '110', '0801. Divino Paraíso, Tegucigalpa', '+504 7234-8212', '3', '2', '1'),
		('Roxana', 'Martínez', '0801-1980-15263', '08-12-1980', 'F', '1', '0801', 'Col. Arturo Quezada, Tegucigalpa', '+504 7483-9837', '3', '2', '1'),
		('Julia', 'Calderón', '0801-1981-11823', '09-09-1981', 'F', '1', '0801', 'Col. Arturo Quezada, Tegucigalpa', '+504 8790-9085', '3', '2', '1'),
		----
		('Sheila', 'Torres', '0503-1981-09283', '02-09-1981', 'F', '1', '0503', 'Buena Vista, Omoa', '+504 7384-8974', '4', '1', '1'),
		('Victor', 'Mateo', '0503-1997-00829', '03-09-1997', 'M', '1', '0503', 'Corinto, Omoa', '+504 9087-9056', '4', '2', '1'),
		('Amelia', 'Lara', '0503-1998-00023', '04-09-1998', 'F', '1', '0503', 'La Venada, Omoa', '+504 9585-7456', '4', '2', '1'),
		('Laura', 'Serrano', '0503-1999-01724', '05-09-1999', 'F', '1', '0503', 'Col. La Loma, Omoa', '+504 8869-9504', '4', '2', '1'),
		('Karla', 'Menjivar', '0503-2000-72834', '06-09-2000', 'F', '1', '0503', 'Chivana, Omoa', '+504 9090-2524', '4', '2', '1'),
		----
		('Laura', 'Marano', '1804-1995-83629', '11-29-1995', 'F', '1', '1804', 'Arenas Blancas, El Progreso', '+504 7384-9382', '5', '1', '1'),
		('Ross', 'Lynch', '1804-1995-18294', '12-29-1995', 'M', '1', '1804', 'Diez Alborotos, El Progreso', '+504 9283-9472', '5', '2', '1'),
		('Timothée', 'Chalamet', '1804-1995-18200', '12-27-1995', 'M', '1', '1804', 'Diez Alborotos, El Progreso', '+504 8273-9488', '5', '2', '1'),
		('Bill', 'Kaulitz', '1804-1989-00283', '09-01-1989', 'M', '1', '1804', 'Campo Amapa, El Progreso', '+504 9984-7383', '5', '2', '1'),
		('Tom', 'Kaulitz', '1804-1989-00284', '09-01-1989', 'M', '2', '1804', 'Campo Amapa, El Progreso', '+504 9863-7482', '5', '2', '1');
		----
GO
INSERT INTO [flet].[tbTrayectos](muni_Inicio, muni_Final, tray_UsuCreacion)
VALUES	('0423','0801',1),
		('0423','0401',1),
		('0423','0506',1),
		('0423','1601',1),
		('0423','1804',1),
		('0423','0209',1),
		('0423','0101',1),
		('0423','0103',1),
		('0423','0318',1),

		('0423','0501' ,1),
		('0423','0401' ,1),
		('0423','0506' ,1),
		('0423','1601' ,1),
		('0423','1804' ,1),
		('0423','0209' ,1),
		('0423','0101' ,1),
		('0423','0103' ,1),
		('0423','0318' ,1)

GO
INSERT INTO [flet].[tbTrayectos](muni_Inicio, muni_Final, tray_UsuCreacion)
VALUES
		('0401','0501'  ,1),
		('0401','0401' ,1),
		('0401','0506'  ,1),
		('0401','1601' ,1),
		('0401','1804' ,1),
		('0401','0209'  ,1),
		('0401','0101' ,1),
		('0401','0103' ,1),
		('0401','0318' ,1),

		('0401','0501' ,1),
		('0401','0401' ,1),
		('0401','0506' ,1),
		('0401','1601' ,1),
		('0401','1804' ,1),
		('0401','0209' ,1),
		('0401','0101' ,1),
		('0401','0103' ,1),
		('0401','0318' ,1)

GO
INSERT INTO [flet].[tbTrayectos](muni_Inicio, muni_Final, tray_UsuCreacion)
VALUES
		('1601','0501' ,1),
		('1601','0401' ,1),
		('1601','0501' ,1),
		('1601','0501' ,1),
		('1601','0501' ,1),
		('1601','0501' ,1),
		('1601','0501' ,1),
		('1601','0501' ,1),
		('1601','0501' ,1),

		('1804',62 ,1),
		('1804',109 ,1),
		('1804',39 ,1),
		('1804',250 ,1),
		('1804',67 ,1),
		('1804',17 ,1),
		('1804',1 ,1),
		('1804',3 ,1),
		('1804',36 ,1)
GO
INSERT INTO [flet].[tbTrayectos](muni_Inicio, muni_Final, tray_UsuCreacion)
VALUES
		(17,62 ,1),
		(17,109 ,1),
		(17,39 ,1),
		(17,250 ,1),
		(17,67 ,1),
		(17,290 ,1),
		(17,1 ,1),
		(17,3 ,1),
		(17,36 ,1),

		(1,62 ,1),
		(1,109 ,1),
		(1,39 ,1),
		(1,250 ,1),
		(1,67 ,1),
		(1,290 ,1),
		(1,17 ,1),
		(1,3 ,1),
		(1,36 ,1)
GO
INSERT INTO [flet].[tbTrayectos](muni_Inicio, muni_Final, tray_UsuCreacion)
VALUES
		(3,62 ,1),
		(3,109 ,1),
		(3,39 ,1),
		(3,250 ,1),
		(3,67 ,1),
		(3,290 ,1),
		(3,17 ,1),
		(3,1 ,1),
		(3,36 ,1),

		(36,62 ,1),
		(36,109 ,1),
		(36,39 ,1),
		(36,250 ,1),
		(36,67 ,1),
		(36,290 ,1),
		(36,17 ,1),
		(36,1 ,1),
		(36,3 ,1)

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
VALUES	(1,62,109,'Dirección: Avenida Principal 123, Colonia Bella Vista, Tegucigalpa. Referencias: Cerca del parque central, al lado del supermercado "El Sol", frente a la escuela "San José".',1,1),
		(2,39,62,'Dirección: Calle Principal 456, Barrio San Miguel, San Pedro Sula. Referencias: A una cuadra del parque central, cerca de la iglesia "San Juan", frente al centro comercial "La Plaza".',1,1),
		(3,290,36,'Dirección: Avenida Central 789, Colonia El Bosque, Siguatepeque.	Referencias: Cerca del parque central, al lado del restaurante "El Rincón del Sabor", frente a la escuela "Miguel Paz Barahona".',1,1),
		(4,1,290,'Dirección: Calle Principal 123, Barrio El Centro, El Progreso. Referencias: Junto al parque central, cerca de la iglesia "San Pedro", frente al mercado municipal.',1,1),
		(5,39,3,'Dirección: Avenida Costera 456, Colonia Playa Azul, Tela. Referencias: Cerca de la playa principal, al lado del hotel "Mar Azul", frente al restaurante "La Brisa".',1,1),
		(6,250,36,'Dirección: Calle Flores 789, Barrio San Francisco, Siguatepeque. Referencias: Cerca del parque central, al lado de la tienda "El Encanto", frente a la escuela "San José".',1,1),
		(7,3,1,'Dirección: Avenida Principal 123, Colonia Los Pinos, La Ceiba. Referencias: Cerca del malecón, al lado del supermercado "El Mar", frente al parque "La Libertad".',1,1),
		(8,62,250,'Dirección: Calle Principal 456, Barrio El Centro, Santa Bárbara. Referencias: Cerca del parque central, al lado del centro de salud, frente a la iglesia "San Juan".',1,1),
		(9,67,62,'Dirección: Avenida Roosevelt 789, Colonia El Bosque, San Pedro Sula. Referencias: Cerca del parque central, al lado del centro comercial "Mega Plaza", frente al hospital "San Pedro".',1,1),
		(10,62,62,'Dirección: Calle Principal 123, Colonia El Carmen, San Pedro Sula. Referencias: Cerca del parque central, al lado del supermercado "El Sol", frente a la escuela "San José".',1,1)	
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

select * from equi.tbVehiculos

INSERT INTO flet.tbFletes(vehi_Id, empe_Id, tray_Id, flet_FechaDeSalida, flet_UsuCreacion)
VALUES 
(1,1,1,	'05-18-2023',1),
(2,2,19,'05-19-2023',1), --EN PARADAS HAY QUE HACER QUE ESTE FLETE (CON LOS ID DE PEDIDO 2 Y 3) VAYA PARA TELA TMB XD (EL TRAYECTO ES 26)
(3,3,36,'05-20-2023',1), 
(4,4,69,'05-21-2023',1),
(5,5,5,	'05-21-2023',1),
(2,2,80,'05-22-2023',1),
(5,5,45,'05-22-2023',1)

select * from flet.tbFletes

INSERT INTO [flet].[tbFleteDetalles] (flet_Id, pedi_Id, fdet_UsuCreacion)
VALUES 
(1,1,1),
(2,2,1),
(2,6,1),
(3,3,1),
(4,4,1)
--****************************************FLETE DETALLES****************************************--


ALTER TABLE [acce].[tbUsuarios]
ADD CONSTRAINT FK_acce_tbUsuarios_flet_tbEmpleados_empe_Id FOREIGN KEY(empe_Id) REFERENCES flet.tbEmpleados(empe_Id)

GO


--****************************************INSERTS ACCESO****************************************--
--****************************************ROLES****************************************--
INSERT INTO acce.tbRoles (role_Nombre,role_UsuCreacion)
VALUES	('Admin', 1),
		('Digitador', 1),
		('Empleado',1);
		
--****************************************PANTALLAS****************************************--
INSERT INTO acce.tbPantallas (pant_Nombre, pant_Url, pant_Menu, pant_Icono, pant_UsuCreacion)
VALUES ('Departamentos',' ',' ',' ',1),
	   ('Direcciones',' ',' ',' ',1),
	   ('Estado Civiles',' ',' ',' ',1),
	   ('Municipios',' ',' ',' ',1),
	   ('Tipo de Pagos',' ',' ',' ',1) ,

	   ('Clientes',' ',' ',' ',1),
	   ('Empleados',' ',' ',' ',1),
	   ('Modelos',' ',' ',' ',1),
	   ('Marcas',' ',' ',' ',1),
	   ('Vehiculos',' ',' ',' ',1),
	   ('Tipos de Vehiculos',' ',' ',' ',1),

	   ('Usuarios',' ',' ',' ',1),
       ('Roles Por Pantalla',' ',' ',' ',1)
	   --('Grafica',1) --17
GO
	    
--****************************************ROLES POR PANTALLAS****************************************--
--INSERT INTO acce.tbPantallasPorRoles(role_Id, pant_Id, prol_UsuCreacion)
--VALUES	( , ,1),
--		( , ,1),
--		( , ,1),
--		( , ,1),
--		( , ,1),
--		( , ,1),
--		( , ,1),
--		( , ,1),
--		( , ,1),
--		( , ,1),
--		( , ,1),
--		( , ,1),
--		( , ,1),
--		( , ,1),
--		( , ,1),
--		( , ,1),
--		( , ,1),
--		( , ,1),
--		( , ,1)
GO
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
				
*/