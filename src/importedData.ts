import { Asset } from './types';

// Simplified TSV representation of the Enterprise IT Asset Lifecycle Database (9 high-impact columns)
// Columns: CI Name | Product Name | Asset State | Org Serial Number | Category | Tingkat Kritikalitas | Location | User | Asset Tag
export const RAW_ENTERPRISE_ASSETS_TSV = `[47290] PATCH PANEL CIPUTAT	PATCH PANEL ALLIED TELESYN ATFS716	In Use	N/A	Patch Panel	Kritikal	KC Gading Serpong	Nerry Wulandary	Not Assigned
[54540] modem provider	Modem ZTE	In Use	N/A	Modem	Kritikal	KC Samarinda	Puput Findy Antika	Not Assigned
[12246] UPS	UPS ICA UPS 202B	In Use	112050089	UPS	Kritikal	KC Medan	Wulan Sastra Winarsih	Not Assigned
[43496] Hardisk Internal 6 TB	WD	In Use	N/A	Storage	Kritikal	KC Palembang	Rozie Friyadi	Not Assigned
[00024 ] PC AV + Monitor	PC	In Use	N/A	PC	kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[01] NVR Hikvision 16 Port	DS-7716NXI-K4/16P	In Use	L06420770	NVR	Kritikal	KF Manokwari	Muhamad Dedi Karnanto	Not Assigned
[46565] Rack tipe Asterix (PO : 13617)	Rack Asterix	In Use	N/A	Rack Server	Kritikal	KC Malang	Dwi Yekti Lestari	Not Assigned
[31850] Rack Asterix N19 Ex RantauPrapat	Rack	In Use	N/A	Rack Server	Kritikal	KC Pekanbaru	Indah Novada Maulina	Not Assigned
[58634] MODEM TELKOM RUANG KOMUNIKASI	Modem Provider	In Use	FGT40FTK2309DLRG	Modem	Kritikal	KC Surabaya	Eka Setiawan	Not Assigned
[58887] MODEM R.KOMUNIKASI	Fiber Home	In Use	FHTT91B07460	Modem	Kritikal	KC Makassar	Dwi Ardi Krisnanto	Not Assigned
[00012] UPS Emerson Liebert 1500 VA (900Watt 230V AVR USB Multilink)	UPS VERTIV	In Use	2008600087PS27M	UPS	Kritikal	KC Malang	Dwi Yekti Lestari	Not Assigned
[00016] Fortinet	Modem FortIget40F	In Use	FGT40FTK23015496	Router	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[40406] Patch Panel 24 Port Panduit Cat 6	Patch Panel Panduit	In Use	N/A	Patch Panel	Kritikal	KC Surabaya	Eka Setiawan	Not Assigned
[35319] Patch Panel Rack 24 Port AMP	Patch Panel AMP	In Use	N/A	Patch Panel	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[37469] Patch Panel 24 Port Panduit Cat 6	Patch Panel Panduit	In Use	N/A	Patch Panel	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[47720] Patch Panel 24 port (PO 13914)	Patch Panel	In Use	N/A	Patch Panel	Kritikal	KC Semarang	I Nyoman Indrawan Puji Astika	Not Assigned
[47717] UPS Emerson Liebert 1500VA (PO 13914)	UPS UPS Emerson Liebert 1500VA	In Use	1916800028PS27 M	UPS	Kritikal	KC Semarang	I Nyoman Indrawan Puji Astika	Not Assigned
[26750] Switch HP Procurve 2530 J9872A-24 Port	Switch HP Procurve 2530 J9872A24 Port	In Use	N/A	Switch	Kritikal	KC Puri Indah	Nurul Annisa	Not Assigned
[40409] Switch Aruba 2530	Switch ARUBA	In Use	CN73FPF01J	Switch	Kritikal	KC Surabaya	Eka Setiawan	Not Assigned
[43069] PDU Outlet Horizontal	PDU	In Use	N/A	PDU	Kritikal	KC Palembang	Rozie Friyadi	Not Assigned
[36311] NVR CCTV HIKVISION	NVR CCTV DS7616NIE2	In Use	581386674	NVR	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[56290] UPS	UPS EATON	In Use	N/A	UPS	Kritikal	KC Tanah Abang	Nytha Rosalina	Not Assigned
[51006] Rack tipe Asterix 19\" 42U	Rack Asterix 19\" 42U	In Use	N/A	Rack Server	Kritikal	KC Semarang	I Nyoman Indrawan Puji Astika	Not Assigned
[46566] Aruba 2530 24 Port (J9782A) (PO : 13617)	Switch ARUBA	In Use	CN83FPF1WY	Switch	Kritikal	KC Malang	Dwi Yekti Lestari	Not Assigned
Switch Aruba 24 Port	J9782A	In Store	CN84FPF1ZG	Switch	Kritikal	KF Timika	Unassigned	Not Assigned
[44539 ] Patch Panel (PO 12966)	Patch Panel	In Use	N/A	Patch Panel	kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[58009] Modem merk fiberhome	Modem FIBERHOME	In Use	N/A	Modem	Kritikal	KC Pluit	Deny Juliadarma	Not Assigned
[62805] Rack	Rack Asterix	In Use	N/A	Rack Server	Kritikal	KC Tanah Abang	Ardi Kurniawan	Not Assigned
[58633] MODEM XL	Modem Provider	In Use	N/A	Modem	Kritikal	KC Surabaya	Eka Setiawan	Not Assigned
[36940 ] PABX Panasonic KXTES824ND 6 Port CO	24 Port ext	In Use	PABX	PABX	Non Kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[47113] Switch HP Aruba 2530 24 Port (PO : 13449)	Switch ARUBA 25530	In Use	N/A	Switch	Kritikal	KC Denpasar	Ni Wayan Erawati	Not Assigned
[12256] Modem Huawei	Modem Huawei	In Use	2150083398EGJ1036143	Modem	Kritikal	KC Medan	Wulan Sastra Winarsih	Not Assigned
[57901] Voice Recorder	NVR ARTECH AQ4LH	In Use	66230075	Voice Recorder	Kritikal	KC Sorong	Sweti	Not Assigned
[57372] VIVOTEK	Hardware VIVOTEK	In Use	N/A 57372	NVR	Kritikal	KC Puri Indah	Nurul Annisa	Not Assigned
[63356] Modem Telkom 2	Modem Huawei 47wd	In Use	N/A	Modem	Kritikal	KC Pekanbaru	Indah Novada Maulina	Not Assigned
[35312] Switch HP Procurve 2530 J9782A	Switch J9782	In Use	CN4BVPF0PR	Switch	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[26170 ] Alat perekam suara	Voice Recorder	In Use	N/A	Telephone Recorder	kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[00027 ] Modem Provider	Modem Provider	In Use	N/A	Modem	kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[58312] MODEM TELKOMSEL	Modem Provider	In Use	N/A	Modem	Kritikal	KC Denpasar	Ni Wayan Erawati	Not Assigned
[64510] PC Dell 7010MT RAM 8 GB SSD 512	OptiPlex tower7010	In Use	N/A	PC	Kritikal	KC Samarinda	Puput Findy Antika	Not Assigned
[64211] UPS Liebert	PSA1500MT3-230U	In Use	2130100059PS27M	UPS	Kritikal	KF Lubuk Linggau	Asyhari Romadhon	Not Assigned
[00014] Fiber home	Modem AN550604	In Use	FHTT053BCFBO	Modem	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[46065] Voice Recorder Artech AQ4L (PO : 13401)	NVR Artech AQ4L	In Use	N/A	Voice Recorder	Kritikal	KC Palembang	Rozie Friyadi	Not Assigned
[46186] SWITCH HP ARUBA	Switch ARUBA 2530	In Use	N/A	Switch	Kritikal	KC Gading Serpong	Nerry Wulandary	Not Assigned
[51007] Switch HP Procurve	Switch Switch HP Procurve	In Use	CN61FPF3JJ	Switch	Kritikal	KC Semarang	I Nyoman Indrawan Puji Astika	Not Assigned
[41389] CCTV + NVR	NVR Hikvision	In Use	N/A	NVR	Kritikal	KC Palopo	Indriyanti Palondongan	Not Assigned
[37472] Patch Panel 24 Port Panduit Cat 6	Patch Panel Panduit	In Use	N/A	Patch Panel	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[58210] Cisco Router R server	TIDAK ADA	In Use	N/A	Router	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[64503] PC Dell 7010 RAM 8 GB SSD 512 Untuk Ruang Cab	PC OptiPlex Tower 7010	In Use	DMK9244	PC	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[58164] FiberHome Modem	Fiber Home	In Use	FHTT917A8C90	Modem	Kritikal	KC Makassar	Dwi Ardi Krisnanto	Not Assigned
[47936] UPS Liebert Cabang (PO20120064)	UPS VERTIV	In Use	N/A	UPS	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[64512] PC Dell 7010MT RAM 8 GB SSD 512 (PC )	PC DELL	In Use	D32M002	PC	Kritikal	KC Surabaya	Eka Setiawan	Not Assigned
[57308] Modem XL	Modem Provider	In Use	N/A	Modem	Kritikal	KC Palopo	Indriyanti Palondongan	Not Assigned
[00005] Fortinet	Router Fortinet	In Use	FGT40FTK20063691	Router	Kritikal	KC Tanah Abang	Nytha Rosalina	Not Assigned
[59495] CCTV	CCTV & NVR HIKVISION	In Use	N/A	NVR	Kritikal	KC Pontianak	Juliansyah	Not Assigned
[48262] MODEM SERVER	Modem ZTE TELKOM	In Use	ZTEGC836CEE9	Modem	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[26775] Switch HP Procurve 2530 24 Port	Switch J9782A	In Use	CN3BFPF2L5	Switch	Kritikal	KC Samarinda	Puput Findy Antika	Not Assigned
[43043] PDU	PDU	In Use	N/A	PDU	Kritikal	KC Palopo	Indriyanti Palondongan	Not Assigned
[12616] PC - Server	PC DELL	In Use	N/A	PC	Kritikal	KC Palembang	Rozie Friyadi	Not Assigned
[58528] MODEM TELKOM	HUAWEI Modem	In Use	215008475LDP6047396	Modem	Kritikal	KC Pontianak	Juliansyah	Not Assigned
[58502] Modem Telkom	Modem Huawei	In Use	N/A	Modem	Kritikal	KC Malang	Dwi Yekti Lestari	Not Assigned
[31078] Artech AQ400 - 4 channels/port	Recorder Artech	In Use	N/A	Voice Recorder	Kritikal	KC Jayapura	Hermala Sari	Not Assigned
[63357] Modem Telkom 2	Modem Adtran TA324	In Use	1287735G1	Modem	Kritikal	KC Pekanbaru	Indah Novada Maulina	Not Assigned
[32090] Artech AQ400 - 4 channels/port	Recorder Artech	In Use	N/A	Voice Recorder	Kritikal	KC Palopo	Indriyanti Palondongan	Not Assigned
[46232] PABX	PABX Panasonic	In Use	KX-TE5824ND	PABX	Kritikal	KC Pontianak	Juliansyah	Not Assigned
[46189] Patch Panel 24 Port Panduit Cat 6 (PO : 13459)	Patch Panel 24 Port Panduit Cat 6	In Use	N/A	Patch Panel	Kritikal	KC Palembang	Rozie Friyadi	Not Assigned
[55494] DVR/NVR HIKVISION	DVR HIKVISION	In Use	DS7732NII424P	NVR	Kritikal	KC Surabaya	Eka Setiawan	Not Assigned
[56371] Router Firewall Newrock	Router MX8G with 4S/4	In Use	NN0117KC140644	Router	Kritikal	KC Pekanbaru	Indah Novada Maulina	Not Assigned
PC Dell Optiplex 7010	PC DELL	In Use	24897Y3	PC	Kritikal	KF Timika	Irma Kamma	Not Assigned
[36311] CCTV Set NVR Hikvision DS-7616NI-E2 - 16 ch (None POE) Harddisk Seagate Survei	CCTV	In Use	N/A	NVR	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[58008] Modem xl putih	Modem XL	In Use	N/A	Modem	Kritikal	KC Pluit	Deny Juliadarma	Not Assigned
[37488] Rack tipe Asterix 19\" 42U depth 900mm Type NRF19030-09P	Rack Asterix	In Use	N/A	Rack Server	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[59537] PDU Rack SERVER	Switch RACK	In Use	N/A	PDU	Kritikal	KC Pontianak	Juliansyah	Not Assigned
[43042] PDU Outlet Horizontal	PDU	In Use	N/A	PDU	Kritikal	KC Palopo	Indriyanti Palondongan	Not Assigned
[37455] PABX Panasonic KXTES824ND	PABX PABX PANASONIC	In Use	N/A	PABX	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[31075] PABX Panasonic KXTES824ND	PABX	In Use	N/A	PABX	Kritikal	KC Jayapura	Hermala Sari	Not Assigned
[46413] PC DELL	DELL	In Use	N/A	PC	Kritikal	KC Pontianak	Juliansyah	Not Assigned
[36954] UPS Emerson Liebert 1500 VA (900Watt 230V AVR USB Multilink)	UPS VERTIV	In Use	1833100135ps27M	UPS	Kritikal	KC Malang	Dwi Yekti Lestari	Not Assigned
[43054] PDU Outlet Horizontal	PDU (Power Distribution Unit) Outlet Horizontal	In Use	N/A	PDU	Kritikal	KC Sorong	Sweti	Not Assigned
[00009] PC AV+MONITOR	PC DELL	In Use	N/A	PC	Kritikal	KC Malang	Dwi Yekti Lestari	Not Assigned
[46190] Patch Panel 24 Port Panduit Cat 6 (PO : 13459)	Patch Panel 24 Port Panduit Cat 6	In Use	N/A	Patch Panel	Kritikal	KC Palembang	Rozie Friyadi	Not Assigned
[54539] modem provider	Modem ZTE	In Use	N/A	Modem	Kritikal	KC Samarinda	Puput Findy Antika	Not Assigned
[55110] Switch HP Procurve 2530 J9782A	Switch 2532	In Use	N/A	Switch	Kritikal	KC Jayapura	Hermala Sari	Not Assigned
[00022] ROUTER TELKOM	Network Device ROUTER TELKOM	In Use	FGT40FTK2309E3V2	Router	Kritikal	KC Puri Indah	Nurul Annisa	Not Assigned
[00021] ROUTER LINTAS ARTA	Network Device ROUTER LINTAS ARTA	In Use	FGT40FTK23051715	Router	Kritikal	KC Puri Indah	Nurul Annisa	Not Assigned
[53870] UPS	UPS ETN 5E1500iUSBC	In Use	PA65M19AH3	UPS	Kritikal	KC Surabaya	Eka Setiawan	Not Assigned
[45838] HDD SURVAILANCE SEAGATE SKYHAWK 6 TB (PO : 13134)	SEAGATE	In Use	N/A	Storage	Kritikal	KC Makassar	Dwi Ardi Krisnanto	Not Assigned
[26622] PABX Panasonic KX-TES 82ND	PABX TT SERIES	In Use	N/A	PABX	Kritikal	KC Samarinda	Puput Findy Antika	Not Assigned
[53890] UPS 1500 Kva	EATON	In Use	PA65M19AG6	UPS	Kritikal	KC Makassar	Dwi Ardi Krisnanto	Not Assigned
[45836] NVR HIKVISION DS-7732NI-K4/16P (PO : 13134)	Hikvision	In Use	N/A	NVR	Kritikal	KC Makassar	Dwi Ardi Krisnanto	Not Assigned
[50709] UPS Emerson Liebert 1500 VA (900Watt 230V AVR USB Multilink) PSA1500MT3-230	Hardware Liebert 1500 VA	In Use	N/A	UPS	Kritikal	KC Puri Indah	Nurul Annisa	Not Assigned
[37473] Patch Panel 24 Port Panduit Cat 6	Patch Panel Panduit	In Use	N/A	Patch Panel	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[00028 ] PDU	PDU	In Use	N/A	PDU	kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[59539] PDU Rack SERVER	Switch RACK	In Use	N/A	PDU	Kritikal	KC Pontianak	Juliansyah	Not Assigned
[35295] Voice Recorder Artech AQ4L	VOICE RECORDER AQ4L	In Use	N/A	Voice Recorder	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[46223] Patch Panel	Patch Panel AMP	In Use	N/A	Patch Panel	Kritikal	KC Pontianak	Juliansyah	Not Assigned
[26776] Rack asterix N19\" Basic Rack 42U depth 900mm	Rack Asterix	In Use	N/A	Rack Server	Kritikal	KC Samarinda	Puput Findy Antika	Not Assigned
[43063] PDU Outlet Horizontal	PDU (Power Distribution Unit) PDU	In Use	N/A	PDU	Kritikal	KC Surabaya	Eka Setiawan	Not Assigned
[55382] Switch HP Aruba 2530 24 Port	Switch Switch HP Aruba 2530 24 Port	In Use	CN97FPF0G2	Switch	Kritikal	KC Semarang	I Nyoman Indrawan Puji Astika	Not Assigned
[00018] Monitor PCAP Dell	Monitor Dell	In Use	5Q8JQY3	Monitor	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[36958] Patch Panel 24 Port Panduit Cat 6	Patch Panel	In Use	N/A	Patch Panel	Kritikal	KC Malang	Dwi Yekti Lestari	Not Assigned
[36960] Patch Panel 24 Port Panduit Cat 6	Patch Panel	In Use	N/A	Patch Panel	Kritikal	KC Malang	Dwi Yekti Lestari	Not Assigned
[47723] Voice recorder artech (PO 13914)	Voice Recorder AQ4LH	In Use	66190191	Voice Recorder	Kritikal	KC Semarang	I Nyoman Indrawan Puji Astika	Not Assigned
[10618] ZTE TELKOM	Modem ZTE TELKOM	In Use	ZTEGC82574E6	Modem	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[44536 ] Patch Panel (PO 12966)	Patch Panel	In Use	N/A	Patch Panel	kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[02] NVR Hikvision 16 Port	Hikvision 16 Port	In Use	Not Assigned	NVR	Kritikal	KF Timika	Unassigned	Not Assigned
[46221] Switch HP Aruba	Switch HP	In Use	CN8AFPF251	Switch	Kritikal	KC Pontianak	Juliansyah	Not Assigned
[47116] Patch Panel 24 Port Panduit Cat 6 (PO : 13449)	Patch Panel	In Use	N/A	Patch Panel	Kritikal	KC Denpasar	Ni Wayan Erawati	Not Assigned
[26923] Patch panel rack 24 Port	Patch Panel AMP	In Use	N/A	Patch Panel	Kritikal	KC Samarinda	Puput Findy Antika	Not Assigned
[00003] Modem Telkom	Modem FIBERHOME	In Use	FHTTCOC393CA	Modem	Kritikal	KC Tanah Abang	Nytha Rosalina	Not Assigned
[44258 ] Patch Panel 24 Port Panduit Cat 6	Patch Panel	In Use	N/A	Patch Panel	kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[59519] CPU PC CCTV RUANG SERVER	DELL	In Use	N/A	PC	Kritikal	KC Pontianak	Juliansyah	Not Assigned
[63358] Modem Indihome	Modem Provider	In Use	N/A	Modem	Kritikal	KC Pekanbaru	Indah Novada Maulina	Not Assigned
[12402] PABX	PABX Panasonic	In Use	KXTES824	PABX	Kritikal	KC Surabaya	Eka Setiawan	Not Assigned
[00006] Modem Telkom	Modem Huawei	In Use	N/A	Modem	Kritikal	KC Tanah Abang	Nytha Rosalina	Not Assigned
[58946] Router Cisco Lt.2 - R. Komunikasi	Router Cisco 1800	In Use	N/A	Router	Kritikal	KC Pekanbaru	Indah Novada Maulina	Not Assigned
[58484] MODEM TELKOM SERVER	Modem ZTE INDIHOME	In Use	ZTEGCC4E14F2	Modem	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[58001] DVR CCTV	CCTV Hikvision	In Use	N/A	NVR	Kritikal	KC Pluit	Deny Juliadarma	Not Assigned
[31077] Rack Asterix N19\" Basic Raaxk 42U 900mm	Rack	In Use	N/A	Rack Server	Kritikal	KC Jayapura	Hermala Sari	Not Assigned
[67212] Voice recorder Artech AQ800	Voice Recorder Artech AQ800	In Use	N/A	Voice Recorder	Kritikal	KC Gading Serpong	Nerry Wulandary	Not Assigned
[33696] Switch HP	Switch HP Switch Pro Curve	In Use	N/A	Switch	Kritikal	KC Palembang	Rozie Friyadi	Not Assigned
[47211] HDD SEAGATE SKYHAWK 6 TB Makassar (HD Internal Untuk CCTV) - PO 13783	SEAGATE	In Use	N/A	Storage	Kritikal	KC Makassar	Dwi Ardi Krisnanto	Not Assigned
[64500] PC Dell 7010MT RAM 8 GB SSD 512 (PC Anti Virus )	PC DELL	In Use	N/A	PC	Kritikal	KC Jayapura	Hermala Sari	Not Assigned
Rak Server KF Manokwari LT2	Rack Server	In Use	Not Assigned	Rack Server	Kritikal	KF Manokwari	Joan Moniaga	Not Assigned
[34648] Pacth Panel U/ Rack Server	Patch Panel AMP Netconnect Categ System 6	In Use	N/A	Patch Panel	Kritikal	KC Medan	Wulan Sastra Winarsih	Not Assigned
[00008] Patch Panel	PANDUIT	In Use	N/A	Patch Panel	Kritikal	KC Tanah Abang	Nytha Rosalina	Not Assigned
[36959] Patch Panel 24 Port Panduit Cat 6	Patch Panel	In Use	N/A	Patch Panel	Kritikal	KC Malang	Dwi Yekti Lestari	Not Assigned
Patch Panel KF Manado	Patch Panel 24 Ports	In Store	n/a	Patch Panel	Non Kritikal	Kantor Fungsional Manado	Unassigned	n/a
[57999] Switch di hp1	Switch DLINK	In Use	N/A	Switch	Kritikal	KC Pluit	Deny Juliadarma	Not Assigned
[43052] PDU Outlet Horizontal	PDU (Power Distribution Unit) outlate	In Use	N/A	PDU	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[37480] Switch HP Procurve 2510 24 Port	Switch HP	In Use	N/A	Switch	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[64256] Switch poe hikvision 16 port	Hardware HIKVISION	In Use	N/A	Switch	Kritikal	KC Puri Indah	Nurul Annisa	Not Assigned
[46191] Patch Panel 24 Port Panduit Cat 6 (PO : 13459)	Patch Panel 24 Port Panduit Cat 6	In Use	N/A	Patch Panel	Kritikal	KC Palembang	Rozie Friyadi	Not Assigned
[46971] PC Dell OPT 3060MT (PO : 13588)	PC DELL OPT 3060 MT	In Use	CN-0K5DX5	PC	Kritikal	KC Denpasar	Ni Wayan Erawati	Not Assigned
[65106] PDU Outlet Horizontal	Switch Sentarack	In Use	N/A	PDU	Kritikal	KC Tanah Abang	Nytha Rosalina	Not Assigned
[57312] Cisco 1800 Series	Cisco 1800	In Use	N/A	Router	Kritikal	KC Palopo	Indriyanti Palondongan	Not Assigned
[66276] Voice Logger with Touch Screen untuk	Voice recording Voice recording	In Use	N/A	Voice Recorder	Kritikal	KC Puri Indah	Nurul Annisa	Not Assigned
[45211] UPS EMERSON COVER PDU	UPS PSA1500MT3/1500FA	In Use	1602200254PS27M	UPS	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[26922] Patch panel rack 24 Port	Patch Panel AMP	In Use	N/A	Patch Panel	Kritikal	KC Samarinda	Puput Findy Antika	Not Assigned
[26925] Patch panel rack 24 Port	Patch Panel AMP	In Use	N/A	Patch Panel	Kritikal	KC Samarinda	Puput Findy Antika	Not Assigned
[43053] PDU Outlet Horizontal	PDU (Power Distribution Unit) outlate	In Use	N/A	PDU	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[58947] PDU	PDU (Power Distribution Unit) 6 lubang	In Use	N/A	PDU	Kritikal	KC Pekanbaru	Indah Novada Maulina	Not Assigned
[41414] CCTV + NVR	CCTV HANGZHOU HIKVISION	In Use	310052	NVR	Kritikal	KC Sorong	Sweti	Not Assigned
[62804] Aruba	Aruba Router	In Use	N/A	Router	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[26751] Rack Asterix 19\"Basic Rack 42U	Hardware Asterix 19	In Use	N/A	Rack Server	Kritikal	KC Puri Indah	Nurul Annisa	Not Assigned
[12253] DVR	CCTV & NVR HIKVISION DS7716NIK4/16P	In Use	687171785	NVR	Kritikal	KC Medan	Wulan Sastra Winarsih	Not Assigned
[58311] MODEM XL	Modem Provider	In Use	N/A	Modem	Kritikal	KC Denpasar	Ni Wayan Erawati	Not Assigned
[43041] PDU HORIZONTAL	PDU PDU HORIZONTAL	In Use	N/A	PDU	Kritikal	KC Gading Serpong	Nerry Wulandary	Not Assigned
[46220] Switch HP Aruba	Switch HP	In Use	CN8AFPF1N3	Switch	Kritikal	KC Pontianak	Juliansyah	Not Assigned
[58507] PDU horizontal	PDU (Power Distribution Unit)	In Use	N/A	PDU	Kritikal	KC Malang	Dwi Yekti Lestari	Not Assigned
[55113] HIKVISION	NVR CCTV	In Use	N/A	NVR	Kritikal	KC Jayapura	Hermala Sari	Not Assigned
[58636] MODEM HUAWEI RUANG KOMUNIKASI	Modem Provider	In Use	N/A	Modem	Kritikal	KC Surabaya	Eka Setiawan	Not Assigned
[46266] Voice Recorder Artech AQ4L	Artech	In Use	N/A	Voice Recorder	Kritikal	KC Pontianak	Juliansyah	Not Assigned
[58508] PDU horizontal	PDU (Power Distribution Unit)	In Use	N/A	PDU	Kritikal	KC Malang	Dwi Yekti Lestari	Not Assigned
[46222] Patch Panel	Patch Panel AMP	In Use	N/A	Patch Panel	Kritikal	KC Pontianak	Juliansyah	Not Assigned
[40404] Patch Panel 24 Port Panduit Cat 6	Patch Panel Panduit	In Use	N/A	Patch Panel	Kritikal	KC Surabaya	Eka Setiawan	Not Assigned
[58282] Recorder	Recorder Artech	In Use	66150867	Voice Recorder	Kritikal	KC Tanah Abang	Nytha Rosalina	Not Assigned
[04] UPS EATON	5E100iU SBC	In Use	PA65N43DCF	UPS	Kritikal	KF Manokwari	Muhamad Dedi Karnanto	Not Assigned
[35318] Patch Panel Rack 24 Port AMP	Patch Panel AMP	In Use	N/A	Patch Panel	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[55112] CISCO 1800 SERIES	Router 1800	In Use	N/A	Router	Kritikal	KC Jayapura	Hermala Sari	Not Assigned
[57313] TP-Link 24 Port	Patch Panel	In Use	N/A	Switch	Kritikal	KC Palopo	Indriyanti Palondongan	Not Assigned
[64502] PC antivirus RAM 8 GB SSD 512 GB	PC Optiplex	In Use	BMK9244	PC	Kritikal	KC Pekanbaru	Indah Novada Maulina	Not Assigned
[32095] Switch HP Procurve 2530 J9782A	Switch 2534	In Use	N/A	Switch	Kritikal	KC Palopo	Indriyanti Palondongan	Not Assigned
[26924] Patch panel rack 24 Port	Patch Panel AMP	In Use	N/A	Patch Panel	Kritikal	KC Samarinda	Puput Findy Antika	Not Assigned
[45396] Switch HP Aruba	Switch HP	In Use	N/A	Switch	Kritikal	KC Makassar	Dwi Ardi Krisnanto	Not Assigned
[55683] NVR Hikvision DS-7616NI-E2 / 16P	NVR Hikvision	In Use	16P1620160720AARR626903999WCVU	NVR	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[54542] router (cisco 1800 series)	Router 1800	In Use	N/A	Router	Kritikal	KC Samarinda	Puput Findy Antika	Not Assigned
[35321] Patch Panel Rack 24 Port AMP	Patch Panel AMP	In Use	N/A	Patch Panel	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[44257 ] UPS Emerson Liebert 1500 VA (900Watt 230V AVR USB Multilink)	UPS	In Use	N/A	UPS	kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[60531] NVR Hikvision DS-7716NI-K4/16P For 16 Channel	NVR Hikvision	In Use	N/A	NVR	Kritikal	KC Pontianak	Juliansyah	Not Assigned
[55111] CISCO 1800 SERIES	Router 1800	In Use	N/A	Router	Kritikal	KC Jayapura	Hermala Sari	Not Assigned
PC Dell Optiplex Tower	PC DELL	In Store	36897Y3	PC	Kritikal	KF Manokwari	Unassigned	Not Assigned
[52222] PC Dell Optiplex 3020	PC DELL	In Use	CN-0657PN-64180-469-4EYB	PC	Kritikal	KC Sorong	Sweti	Not Assigned
[35310] Switch HP Procurve 2530 J9782A	Switch J9782	In Use	CN4BFPF0PZ	Switch	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[44788 ] NVR HIKVISION DS-7732NI-K4/16P	NVR	In Use	N/A	NVR	kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[58490] ROUTER RUANG SERVER	Router ZTE	In Use	N/A	Router	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[43071] PDU Outlet Horizontal	PDU (Power Distribution Unit) 8 LUBANG	In Use	N/A	PDU	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[53867] UPS	UPS ETN 5E1500iUSBC	In Use	PA65M19AH2	UPS	Kritikal	KC Surabaya	Eka Setiawan	Not Assigned
[36957] Switch HP Procurve 2510 24 Port	Switch HP	In Use	CN319FW035	Switch	Kritikal	KC Malang	Dwi Yekti Lestari	Not Assigned
Rack Server KF Manado	19\" Rack Server	In Use	n/a	Rack Server	Kritikal	Kantor Fungsional Manado	Joan Moniaga	n/a
[31370] Rack Asterix N19\" Basic Raaxk 42U 900mm	Rack Asterix N19\" Basic Raaxk 42U 900mm	In Use	N/A	Rack Server	Kritikal	KC Sorong	Sweti	Not Assigned
[52433] PABX	PABX Panasonic PABX	In Use	N/A	PABX	Kritikal	KC Palembang	Rozie Friyadi	Not Assigned
[05] UPS EATON	5E1500IU SBC	In Use	PA65N43DDE	UPS	Kritikal	KF Timika	Irma Kamma	Not Assigned
[43865] NVR Hikvision DS-7716NI-K4/16P	NVR Hikvision	In Use	N/A	NVR	Kritikal	KC Tanah Abang	Nytha Rosalina	Not Assigned
[46229] Rack	Shelf Rack  INDORACK	In Use	N/A	Rack Server	Kritikal	KC Pontianak	Juliansyah	Not Assigned
[56451] UPS	UPS LIEBERT	In Use	PA65N43DTT	UPS	Kritikal	KC Pontianak	Juliansyah	Not Assigned
[12260] Switch	Switch AMP Netconnect Categ System 6	In Use	N/A	Switch	Kritikal	KC Medan	Wulan Sastra Winarsih	Not Assigned
[43068] PDU Outlet Horizontal	PDU	In Use	N/A	PDU	Kritikal	KC Palembang	Rozie Friyadi	Not Assigned
[58632] MODEM ZTE	Modem Provider	In Use	N/A	Modem	Kritikal	KC Surabaya	Eka Setiawan	Not Assigned
[53214] Patch Panel 24 port Panduit	Patch Panel 24 Port Panduit Cat 6	In Use	N/A	Patch Panel	Kritikal	KC Palembang	Rozie Friyadi	Not Assigned
[46185] Rack tipe Asterix 19\" (PO : 13459)	Rack Asterix 19\"	In Use	N/A	Rack Server	Kritikal	KC Palembang	Rozie Friyadi	Not Assigned
[36961] Patch Panel 24 Port Panduit Cat 6	Patch Panel	In Use	N/A	Patch Panel	Kritikal	KC Malang	Dwi Yekti Lestari	Not Assigned
[55684] NVR DIRUANG SERVER	NVR Hikvision	In Use	N/A	NVR	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[03] Dell Monitor	E2020H	In Use	CN-07TR2H	Monitor	Non Kritikal	KF Manokwari	Muhamad Dedi Karnanto	Not Assigned
Switch HP 24 Port KF Manokwari LT 2	HP Swtich	In Store	CN42FPF3Q2	Switch	Kritikal	KF Manokwari	Unassigned	Not Assigned
[31310] PABX Panasonic KXTES824ND	PABX  Panasonic KXTES824ND	In Use	4GATB029296	PABX	Kritikal	KC Sorong	Sweti	Not Assigned
[64197] NVR Hikvision	DS-7716NXI-K4/16P	In Use	FB2692803	NVR	Kritikal	KF Lubuk Linggau	Asyhari Romadhon	Not Assigned
[43877] CCTV	CCTV Hikvision	In Use	N/A	NVR	Kritikal	KC Tanah Abang	Nytha Rosalina	Not Assigned
[11632] PABX	PABX TES824	In Use	N/A	PABX	Kritikal	KC Pekanbaru	Indah Novada Maulina	Not Assigned
[12721 ] Switch 24 Port	Switch 24 Port	In Use	N/A	Switch	kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[58000] Router Cisco	Router Cisco	In Use	N/A	Router	Kritikal	KC Pluit	Deny Juliadarma	Not Assigned
Rack Server	Rack Server	In Use	Not Assigned	Rack Server	Kritikal	KF Timika	Irma Kamma	Not Assigned
[26886] CCTV Samsung	CCTV & NVR Samsung 16 poe	In Use	N/A	NVR	Kritikal	KC Palembang	Rozie Friyadi	Not Assigned
[56915] modem telkom ZTE	Modem ZXHN F609	In Use	1AAF101206001080028	Modem	Kritikal	KC Sorong	Sweti	Not Assigned
[00002] PC 1 Set	PC DELL	In Use	CN-07TR2H-QDC00-33F-1IUI-A09	PC	Kritikal	KC Tanah Abang	Nytha Rosalina	Not Assigned
[37468] Patch Panel 24 Port Panduit Cat 6	Patch Panel Panduit	In Use	N/A	Patch Panel	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[66475] Rak Server	Rack Server	In Use	Not Assigned	Rack Server	Kritikal	KF Lubuk Linggau	Asyhari Romadhon	Not Assigned
Switch Catalyst KF Manado	Switch Catalyst	In Store	FOC2631Y68L	Switch	Kritikal	Kantor Fungsional Manado	Unassigned	n/a
[66474] Switch 3Com Baseline 24 Port	3C16471B	In Use	CA/9N30EE0391109	Switch	Kritikal	KF Lubuk Linggau	Asyhari Romadhon	Not Assigned
[26916] Patch Panel untuk Rack - 24 Port AMP Cat 6 Panduit	Network Device 24 Port AMP Cat 6 panduit	In Use	N/A	Patch Panel	Kritikal	KC Puri Indah	Nurul Annisa	Not Assigned
[47020] Wifi Aruba (PO : 13736)	Access Point Aruba JZ320A	In Use	CNJMK9TDS6	Access Point	Kritikal	KC Sorong	Sweti	Not Assigned
[37481] Switch HP Procurve 2510 24 Port	Switch hp 253024	In Use	N/A	Switch	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[58888] MODEM R.KOMUNIKASI	Fiber Home	In Use	N/A	Modem	Kritikal	KC Makassar	Dwi Ardi Krisnanto	Not Assigned
[00026 ] Fortinet	Router Forti	In Use	N/A	Router	kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[26774] Switch HP Procurve 2530 24 Port	Switch J9782A	In Use	CN3BFPF3N7	Switch	Kritikal	KC Samarinda	Puput Findy Antika	Not Assigned
[00017] Fiber home	Modem HG6145D2	In Use	FHTT9DB03C30	Modem	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[00015] Fortinet	Modem FortIget40F	In Use	FGT40FTK2309DLWS	Router	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[58491] PDU OUTLET RUANG SERVER	PDU (Power Distribution Unit) outlate	In Use	N/A	PDU	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[32079] Rack Asterix N19\" Basic Raaxk 42U 900mm	Rack	In Use	N/A	Rack Server	Kritikal	KC Palopo	Indriyanti Palondongan	Not Assigned
[37471] Patch Panel 24 Port Panduit Cat 6	Patch Panel Panduit	In Use	N/A	Patch Panel	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[55239] ROUTER MERK CISCO	Router Cisco	In Use	N/A	Router	Kritikal	KC Pontianak	Juliansyah	Not Assigned
[47123] Voice Recorder Artech AQ4L (PO : 13449)	NVR Artech AQ4L	In Use	N/A	Voice Recorder	Kritikal	KC Denpasar	Ni Wayan Erawati	Not Assigned
[57998] Switch di hp1	Switch DLINK	In Use	N/A	Switch	Kritikal	KC Pluit	Deny Juliadarma	Not Assigned
[26749] Switch HP Procurve 2530 J9872A-24 Port	Switch HP Procurve 2530 J9872A24 Port	In Use	N/A	Switch	Kritikal	KC Puri Indah	Nurul Annisa	Not Assigned
[65925] PDU 8 Port Power Outlet	PDU Server	In Use	Not Assigned	PDU	Kritikal	KF Lubuk Linggau	Asyhari Romadhon	Not Assigned
[31274] Patch Panel untuk rack 24 port AMP	Patch Panel	In Use	N/A	Patch Panel	Kritikal	KC Jayapura	Hermala Sari	Not Assigned
[54974] Rack SERVER	Rack ADA	In Use	N/A	Rack Server	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[44537 ] Patch Panel (PO 12966)	Patch Panel	In Use	N/A	Patch Panel	kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[47651] UPS Emerson Liebert 1500VA	UPS EMERSON LIEBERT	In Use	N/A	UPS	Kritikal	KC Gading Serpong	Nerry Wulandary	Not Assigned
[31150] Switch HP Procurve 2530 J9782A	Switch 2531	In Use	N/A	Switch	Kritikal	KC Jayapura	Hermala Sari	Not Assigned
[45019] UPS Emerson Liebert 1500 VA (900Watt 230V AVR USB Multilink)	UPS Emerson	In Use	N/A	UPS	Kritikal	KC Pluit	Deny Juliadarma	Not Assigned
[00025 ] Fortinet	Router Forti	In Use	N/A	Router	kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[47721] Patch Panel 24 port (PO 13914)	Patch Panel	In Use	N/A	Patch Panel	Kritikal	KC Semarang	I Nyoman Indrawan Puji Astika	Not Assigned
[47210] HDD SEAGATE SKYHAWK 6 TB Makassar (HD Internal Untuk CCTV) - PO 13783	SEAGATE	In Use	N/A	Storage	Kritikal	KC Makassar	Dwi Ardi Krisnanto	Not Assigned
[47115] Patch Panel 24 Port Panduit Cat 6 (PO : 13449)	Patch Panel	In Use	N/A	Patch Panel	Kritikal	KC Denpasar	Ni Wayan Erawati	Not Assigned
[55380] Patch Panel 24 Port	Patch Panel	In Use	N/A	Patch Panel	Kritikal	KC Semarang	I Nyoman Indrawan Puji Astika	Not Assigned
[43909] CCTV	CCTV & NVR samsung	In Use	N/A	NVR	Kritikal	KC Palembang	Rozie Friyadi	Not Assigned
[47120] Rack tipe Asterix 19\" (PO : 13449)	Rack ASTERIX 19	In Use	N/A	Rack Server	Kritikal	KC Denpasar	Ni Wayan Erawati	Not Assigned
[44538 ] Patch Panel (PO 12966)	Patch Panel	In Use	N/A	Patch Panel	kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[40408] Switch Aruba 2530	Switch ARUBA	In Use	CN73FPF0JW	Switch	Kritikal	KC Surabaya	Eka Setiawan	Not Assigned
[40403] Patch Panel 24 Port Panduit Cat 6	Patch Panel Panduit	In Use	N/A	Patch Panel	Kritikal	KC Surabaya	Eka Setiawan	Not Assigned
[64213] CPU Dell Optiplex 7010	Optiplex 7010	In Use	C6NC924	PC	Kritikal	KF Lubuk Linggau	Asyhari Romadhon	Not Assigned
[36925] Voice Recorder NAR4004 w/ 4 Port Line	NVR CCTV	In Use	N/A	Voice Recorder	Kritikal	KC Malang	Dwi Yekti Lestari	Not Assigned
[36927] Instalasi CCTV	CCTV Hikvision	In Use	N/A	NVR	Kritikal	KC Malang	Dwi Yekti Lestari	Not Assigned
[36917] PABX Panasonic KXTES824ND	PABX Panasonic	In Use	KXTES824ND	PABX	Kritikal	KC Malang	Dwi Yekti Lestari	Not Assigned
[64594] PC Dell 7010MT RAM 8 GB SSD 512 GB (PC AV )	PC Dell 7010 MT	In Use	FSDY944	PC	Kritikal	KC Medan	Wulan Sastra Winarsih	Not Assigned
[12510] Switch	Switch HP Switch Pro Curve	In Use	N/A	Switch	Kritikal	KC Palembang	Rozie Friyadi	Not Assigned
[45395] Patch Panel	PANDUIT	In Use	N/A	Patch Panel	Kritikal	KC Makassar	Dwi Ardi Krisnanto	Not Assigned
[36934] UPS Emerson 1500 va	Hardware Liebert 1500 VA	In Use	N/A	UPS	Kritikal	KC Puri Indah	Nurul Annisa	Not Assigned
[35320] Patch Panel Rack 24 Port AMP	Patch Panel AMP	In Use	N/A	Patch Panel	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[58338] MODEM ZTE	Modem Provider	In Use	N/A	Modem	Kritikal	KC Jayapura	Hermala Sari	Not Assigned
[43044] PDU Outlet Horizontal	PDU	In Use	N/A	PDU	Kritikal	KC Samarinda	Puput Findy Antika	Not Assigned
[43820] NVR HIKVISION DS-7716NI-K4/16P (ex. Cab. )	NVR NVR Hikvision DS7716NIK4/16P	In Use	C03027276	NVR	Kritikal	KC Semarang	I Nyoman Indrawan Puji Astika	Not Assigned
[43045] PDU Outlet Horizontal	PDU PDU	In Use	N/A	PDU	Kritikal	KC Samarinda	Puput Findy Antika	Not Assigned
[44250 ] Switch HP Aruba 2530 24 Port	Switch 24 Port	In Use	N/A	Switch	kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[00007] Patch Panel	PANDUIT	In Use	N/A	Patch Panel	Kritikal	KC Tanah Abang	Nytha Rosalina	Not Assigned
[52032] UPS Emerson	UPS Emerson	In Use	N/A	UPS	Kritikal	KC Denpasar	Ni Wayan Erawati	Not Assigned
[46187] SWITCH HP ARUBA	Switch ARUBA 2530	In Use	N/A	Switch	Kritikal	KC Gading Serpong	Nerry Wulandary	Not Assigned
[58012] switch D LINK server	Switch D LINK	In Use	N/A	Switch	Kritikal	KC Pluit	Deny Juliadarma	Not Assigned
[43062] PDU Outlet Horizontal	PDU (Power Distribution Unit) PDU	In Use	N/A	PDU	Kritikal	KC Surabaya	Eka Setiawan	Not Assigned
[47716] UPS Emerson Liebert 1500VA (PO 13914)	UPS UPS Emerson Liebert 1500VA	In Use	2008600196PS27 M	UPS	Kritikal	KC Semarang	I Nyoman Indrawan Puji Astika	Not Assigned
[58007] Modem xl putih	Modem XL	In Use	N/A	Modem	Kritikal	KC Pluit	Deny Juliadarma	Not Assigned
[43070] PDU Outlet Horizontal	PDU (Power Distribution Unit) 8 LUBANG	In Use	N/A	PDU	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[26915] Patch Panel untuk Rack - 24 Port AMP Cat 6 Panduit	Network Device 24 Port AMP Cat 6 panduit	In Use	N/A	Patch Panel	Kritikal	KC Puri Indah	Nurul Annisa	Not Assigned
[58504] Modem Telkom	Modem ZTE	In Use	EQG2J7X09638	Modem	Kritikal	KC Malang	Dwi Yekti Lestari	Not Assigned
[54678] UPS	UPS	In Use	N/A	UPS	Kritikal	KC Palopo	Indriyanti Palondongan	Not Assigned
[38531] CCTV Network Hikvision	CCTV Hikvision	In Use	N/A	NVR	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
[65105] PDU Outlet Horizontal	Switch Indorack	In Use	N/A	PDU	Kritikal	KC Tanah Abang	Nytha Rosalina	Not Assigned
[37470] Patch Panel 24 Port Panduit Cat 6	Patch Panel Panduit	In Use	N/A	Patch Panel	Kritikal	KC Kelapa Gading	Intan Fauziah	Not Assigned
Dell Monitor	E2020H	In Store	CN071R2H	Monitor	Non Kritikal	KF Timika	Unassigned	Not Assigned
[64191] CCTV Hikvision	DS-2CD212392-1U	In Use	AD4992246	NVR	Kritikal	KF Lubuk Linggau	Asyhari Romadhon	Not Assigned
[12509] Switch	Switch HP Switch Pro Curve	In Use	N/A	Switch	Kritikal	KC Palembang	Rozie Friyadi	Not Assigned
[58166] PC OPTIPLEX ANTI VIRUS	PC DELL	In Use	N/A	PC	Kritikal	KC Makassar	Dwi Ardi Krisnanto	Not Assigned
[58168] VOICE RECORDER	Artech	In Use	N/A	Voice Recorder	Kritikal	KC Makassar	Dwi Ardi Krisnanto	Not Assigned
[43040] PDU HORIZONTAL	PDU PDU HORIZONTAL	In Use	N/A	PDU	Kritikal	KC Gading Serpong	Nerry Wulandary	Not Assigned
[31912] Patch Panel untuk rack 24 port AMP	Patch Panel Panduit	In Use	N/A	Patch Panel	Kritikal	KC Pekanbaru	Indah Novada Maulina	Not Assigned
[56459] UPS UPS eaton	UPS 5E1500USBC	In Use	PA65N43DTG	UPS	Kritikal	KC Sorong	Sweti	Not Assigned
[35296] PABX ( 6 Line CO' 24 Port Ext )	PABX KXTES824 PANASONIC	In Use	6ABTA044041	PABX	Kritikal	KC Jababeka	Tiara Jeanny Raharjo Putri	Not Assigned
[47117] Patch Panel 24 Port Panduit Cat 6 (PO : 13449)	Patch Panel	In Use	N/A	Patch Panel	Kritikal	KC Denpasar	Ni Wayan Erawati	Not Assigned
[58529] MODEM XL	ZTE Modem	In Use	N/A	Modem	Kritikal	KC Pontianak	Juliansyah	Not Assigned
[39825] Ext HDD Seagate 2.5\" 1 TB	Seagate 1 TB	In Use	NAA45N48	Storage	Kritikal	KC Medan	Wulan Sastra Winarsih	Not Assigned
[44535 ] Switch HP Aruba (PO 12966)	Switch 24 Port	In Use	N/A	Switch	kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[60101] Voice Recorder	NVR ARTECH	In Use	N/A	Voice Recorder	Kritikal	KC Pluit	Deny Juliadarma	Not Assigned
[47759] PC Dell opt 3070 monitor CCTV (ruang komunikasi) (PO 13922)	PC PC Dell opt 3070	In Use	CN-0K5DX5	PC	Kritikal	KC Semarang	I Nyoman Indrawan Puji Astika	Not Assigned
[12720 ] Switch 24 Port	Switch 24 Port	In Use	N/A	Switch	kritikal	KC Bandung	Ardian Kristyawan	Not Assigned
[58167] PABX	PABX Panasonic	In Use	N/A	PABX	Kritikal	KC Makassar	Dwi Ardi Krisnanto	Not Assigned
[43912] CCTV	CCVT HIKVISION	In Use	N/A	NVR	Kritikal	KC Samarinda	Puput Findy Antika	Not Assigned
[63355] Modem Telkom 1	Modem Huawei 47wd	In Use	48575443577C1F63	Modem	Kritikal	KC Pekanbaru	Indah Novada Maulina	Not Assigned
[00020] MODEM TELKOM	Network Device MODEM TELKOM	In Use	21500847562B46029951	Modem	Kritikal	KC Puri Indah	Nurul Annisa	Not Assigned`;

// Maps columns: CI Name | Product Name | Asset State | Org Serial Number | Category | Tingkat Kritikalitas | Location | User | Asset Tag
export function parseImportedTSV(): Asset[] {
  const lines = RAW_ENTERPRISE_ASSETS_TSV.trim().split('\n');
  const assets: Asset[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    const cols = line.split('\t');
    if (cols.length < 8) continue;

    const ciName = cols[0] || '';
    const productName = cols[1] || '';
    const assetState = cols[2] || 'In Use';
    const serialNumberRaw = cols[3] || 'N/A';
    const rawCategoryName = cols[4] || '';
    const rawCriticality = cols[5] || 'Kritikal';
    const locationRaw = cols[6] || 'Kantor Pusat';
    const userRaw = cols[7] || 'Unassigned';
    const assetTagRaw = cols[8] || 'Not Assigned';

    // Parse ID and Name
    let id = '';
    let name = '';
    const bracketMatch = ciName.match(/^\[(.*?)\]\s*(.*)$/);
    if (bracketMatch) {
      id = 'CI-' + bracketMatch[1].trim();
      name = bracketMatch[2].trim() || productName || ciName;
    } else {
      id = `CI-GEN-${i + 1}`;
      name = ciName || productName || 'Unnamed Enterprise Asset';
    }

    // Map Category to matched standard groups
    let category = 'Perangkat Jaringan & Keamanan';
    const catLower = rawCategoryName.toLowerCase();
    
    if (catLower.includes('pc') || catLower.includes('monitor')) {
      category = 'Endpoint (PC & Laptop)';
    } else if (catLower.includes('server') || catLower.includes('rack')) {
      category = 'Server & Storage';
    } else if (catLower.includes('storage') || catLower.includes('hardisk') || catLower.includes('hdd') || catLower.includes('seagate')) {
      category = 'Storage';
    } else if (catLower.includes('software') || catLower.includes('lic') || catLower.includes('lisensi')) {
      category = 'Perangkat Lunak Komputer';
    } else if (catLower.includes('ups') || catLower.includes('pdu') || catLower.includes('pabx') || catLower.includes('battery') || catLower.includes('recorder') || catLower.includes('logger')) {
      category = 'Infrastruktur Pendukung TI';
    } else if (catLower.includes('modem') || catLower.includes('router') || catLower.includes('switch') || catLower.includes('panel') || catLower.includes('nvr') || catLower.includes('cctv')) {
      category = 'Perangkat Jaringan & Keamanan';
    } else {
      category = 'Aset TI Pihak Ketiga';
    }

    // Map Status
    let status = 'Active';
    if (assetState.toLowerCase().includes('store') || assetState.toLowerCase().includes('stock')) {
      status = 'InStock';
    }

    // Map Criticality
    let criticality = 'Medium';
    const critLower = rawCriticality.toLowerCase();
    if (critLower.includes('non') || critLower.includes('low')) {
      criticality = 'Low';
    } else if (critLower.includes('kritikal') || critLower.includes('critical')) {
      criticality = 'Critical';
    } else if (critLower.includes('high')) {
      criticality = 'High';
    }

    const serialNumber = (serialNumberRaw === 'N/A' || !serialNumberRaw) ? `SN-${id}` : serialNumberRaw;
    const assetTag = (assetTagRaw === 'Not Assigned' || !assetTagRaw) ? `TAG-${id}` : assetTagRaw;

    assets.push({
      id,
      name,
      category,
      serialNumber,
      assetTag,
      location: locationRaw,
      user: userRaw,
      criticality,
      status,
      source: 'Both',
      expiryDate: '2028-12-25',
      eolDate: '2031-12-31',
      notes: productName && productName !== name ? `Model: ${productName}` : undefined,
      lastUpdated: '2026-06-11'
    });
  }

  // Combine with parsed interactive domain licenses, blade enclosures, SSL, and security devices
  const domainAssets = parseImportedDomainsTSV();
  const enclosureAssets = parseImportedEnclosuresTSV();
  const sslAssets = parseImportedSSLsTSV();
  const securityAssets = parseImportedSecurityDevicesTSV();
  return [...assets, ...domainAssets, ...enclosureAssets, ...sslAssets, ...securityAssets];
}

function parseDomainDate(dateStr: string): string {
  if (!dateStr || dateStr.toLowerCase().includes('not') || dateStr === '-') {
    return '2028-12-31';
  }
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split('T')[0];
    }
  } catch (e) {
    // ignore
  }
  return dateStr;
}

function maskDomain(domain: string): string {
  if (!domain) return '';
  const lowercase = domain.toLowerCase().trim();
  const parts = lowercase.split('.');
  if (parts.length <= 1) return lowercase;
  
  const mainName = parts[0];
  const extension = parts.slice(1).join('.');
  
  if (mainName.length <= 3) {
    return `${mainName[0]}***.${extension}`;
  }
  
  const start = mainName.substring(0, 2);
  const end = mainName.substring(mainName.length - 1);
  const maskLength = Math.max(3, mainName.length - 3);
  const maskedMiddle = '*'.repeat(maskLength);
  
  return `${start}${maskedMiddle}${end}.${extension}`;
}

export function parseImportedDomainsTSV(): Asset[] {
  const lines = RAW_DOMAINS_TSV.trim().split('\n');
  const assets: Asset[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const cols = line.split('\t');
    if (cols.length < 5) continue;

    const ciName = cols[0] || '';
    const productName = cols[1] || '';
    const assetState = cols[2] || 'In Use';
    const expiryDateRaw = cols[3] || 'Dec 31, 2028';
    const vendor = cols[4] || 'Not Assigned';
    const assetOwnership = cols[5] || '';
    const acquisitionDateRaw = cols[6] || 'Jan 1, 2024';
    const userRaw = cols[7] || 'Mochammad Emir';
    const serialNumberRaw = cols[8] || 'Not Assigned';
    const criticalityRaw = cols[9] || 'Kritikal';
    const keteranganRaw = cols[12] || '';
    const locationRaw = cols[32] || 'HO';
    const siteRaw = cols[39] || 'Kantor Pusat';

    // Map ID
    const id = `CI-DOM-${(i + 1).toString().padStart(3, '0')}`;
    const name = maskDomain(ciName);

    // Category mapping
    const category = 'Perangkat Lunak Komputer'; // standard category for domain licenses

    // Status mapping
    const status = 'Active';

    // Criticality Mapping
    let criticality = 'Medium';
    if (criticalityRaw.toLowerCase().includes('kritikal') || criticalityRaw.toLowerCase().includes('critical') || criticalityRaw.toLowerCase().includes('high')) {
      criticality = 'Critical';
    } else if (criticalityRaw.toLowerCase().includes('low') || criticalityRaw.toLowerCase().includes('non')) {
      criticality = 'Low';
    }

    // Serial & Tag
    const serialNumber = serialNumberRaw === 'Not Assigned' || !serialNumberRaw ? `SN-DOM-${name.toUpperCase()}` : `SN-DOM-${name.toUpperCase()}`;
    const assetTag = `TAG-DOM-${name.toUpperCase()}`;

    // Locations
    // HO matches Kantor Pusat perfectly, let's keep location standard
    const location = siteRaw && siteRaw !== 'Not Assigned' ? siteRaw : (locationRaw === 'HO' ? 'Kantor Pusat' : locationRaw);

    const expiryDate = parseDomainDate(expiryDateRaw);
    const lastUpdated = parseDomainDate(acquisitionDateRaw) !== 'Not Assigned' ? parseDomainDate(acquisitionDateRaw) : '2026-06-11';

    // Build Notes (Masked to protect commercial/confidential info)
    const maskedProduct = productName.toLowerCase().includes('parking') ? 'Domain License' : productName;
    const vendorLabel = vendor && vendor !== 'Not Assigned' ? 'Vendor Terdaftar' : 'Not Assigned';
    let notes = `Lisensi domain: ${maskedProduct}. Vendor: ${vendorLabel}. Status kepemilikan dirahasiakan (Corporate Confidential).`;
    if (keteranganRaw && keteranganRaw !== 'Not Assigned' && keteranganRaw !== '-') {
      if (keteranganRaw.toLowerCase().includes('tidak diperpanjang')) {
        notes += ` Catatan: Status Non-Renewal (End of Support)`;
      } else {
        notes += ` Catatan: [Informasi Kepatuhan Internal Terproteksi]`;
      }
    }

    assets.push({
      id,
      name,
      category,
      serialNumber,
      assetTag,
      location,
      user: 'IT Administrator',
      criticality,
      status,
      source: 'Both',
      expiryDate,
      eolDate: '2031-12-31',
      notes,
      lastUpdated
    });
  }

  return assets;
}

export const RAW_DOMAINS_TSV = `PDAJA.CO.ID	Parking Domain	In Use	May 8, 2028 12:00 AM	CBN	BSS	May 8, 2018 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
pdaja.com	Parking Domain	In Use	May 8, 2028 12:00 AM	CBN	BSS	May 8, 2018 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
banksahabat.co.id	Parking Domain	In Use	Jun 12, 2028 12:00 AM	CBN	BSS	Feb 28, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
banksahabatsampoerna.co.id	Parking Domain	In Use	Jun 12, 2028 12:00 AM	CBN	BSS	Feb 28, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
sahabatsampoernabank.co.id	Parking Domain	In Use	Jun 12, 2028 12:00 AM	CBN	BSS	Feb 28, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
banksahabatsampoerna.id	Parking Domain	In Use	Jun 13, 2028 12:00 AM	CBN	BSS	Jun 13, 2014 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
banksampoerna.id	Parking Domain	In Use	Jun 13, 2028 12:00 AM	CBN	BSS	Jun 13, 2014 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
sampoernabank.co.id	Parking Domain	In Use	Jul 4, 2026 12:00 AM	CBN	BSS	Feb 28, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
banksahabatsampoerna.com	Parking Domain	In Use	Aug 7, 2026 12:00 AM	CBN	BSS	Mar 17, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
sahabatbank.biz	Parking Domain	In Use	Aug 7, 2026 12:00 AM	CBN	BSS	Feb 25, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
sahabatbank.com	Parking Domain	In Use	Aug 8, 2026 12:00 AM	CBN	BSS	Feb 26, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
sahabatbank.info	Parking Domain	In Use	Aug 8, 2026 12:00 AM	CBN	BSS	Feb 25, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
sahabatbank.co.id	Parking Domain	In Use	Dec 17, 2025 12:00 AM	CBN	BSS	Feb 28, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Tidak diperpanjang (non-renewal – end of support)	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
banksampoerna.biz	Parking Domain	In Use	Feb 1, 2027 12:00 AM	CBN	BSS	Feb 25, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
sampoernabank.biz	Parking Domain	In Use	Feb 1, 2027 12:00 AM	CBN	BSS	Feb 25, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
banksampoerna.info	Parking Domain	In Use	Feb 2, 2027 12:00 AM	CBN	BSS	Feb 25, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
banksampoerna.org	Parking Domain	In Use	Feb 2, 2027 12:00 AM	CBN	BSS	Feb 25, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
sampoernabank.info	Parking Domain	In Use	Feb 2, 2027 12:00 AM	CBN	BSS	Feb 25, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
sampoernabank.org	Parking Domain	In Use	Feb 2, 2027 12:00 AM	CBN	BSS	Feb 25, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
banksampoerna.net	Parking Domain	In Use	Feb 3, 2028 12:00 AM	CBN	BSS	Feb 26, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
sampoernabank.com	Parking Domain	In Use	Feb 2, 2028 12:00 AM	CBN	BSS	Feb 26, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Not Assigned	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
sampoernabank.net	Parking Domain	In Use	Feb 2, 2028 12:00 AM	CBN	BSS	Feb 26, 2016 12:00 AM	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	-	Tidak diperpanjang (non-renewal – end of support)	Not Assigned	IT	Auto Renewal	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
sampoernafest.com	Parking Domain	In Use	Apr 4, 2027 12:00 AM	Not Assigned	BSS	Not Assigned	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	Not Assigned	Not Assigned	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Domain License	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
banksampoerna.com	Parking Domain	In Use	Feb 3, 2028 12:00 AM	CBN	BSS	Not Assigned	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	Not Assigned	Not Assigned	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir
banksampoerna.co.id	Parking Domain	In Use	Dec 30, 2026 12:00 AM	CBN	BSS	Not Assigned	Mochammad Emir	Not Assigned	Kritikal	Not Assigned	Not Assigned	Not Assigned	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Domain License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Domain License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Not Assigned	-	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mochammad Emir`;

export const RAW_ENCLOSURES_TSV = `Enclosure BladeSystem C7000	c7000	In Use	Aug 1, 2014 12:00 AM	Enclosure	DCI Cibitung	Not Assigned	Not Assigned	Production	IT	BSS	Enclosure Blade C7000	Not Assigned	Not Assigned	SGH436NP3F	Kritikal	Asset	Not Assigned	Enclosure	Not Assigned	Information Technology	HPE BLc7000 CTO 3 IN LCD Plat Enclosure	Maret 2026	Mar 1, 2026 12:00 AM	Mar 1, 2026 12:00 AM	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Jony Firmansyah	Not Assigned	Jony Firmansyah	Not Assigned
BladeSystem C7000 Enclosure G3	c7000	In Use	Jun 1, 2015 12:00 AM	Enclosure	DRC Ariobimo	Not Assigned	Not Assigned	Development	IT	BSS	Enclosure Blade c7000	Sisco Global Solusi	Not Assigned	SGH518Y191	Kritikal	Asset	Not Assigned	Enclosure	Not Assigned	Information Technology	HPE BLc7000 CTO 3 IN LCD Plat Enclosure	Maret 2026	Mar 1, 2026 12:00 AM	Mar 1, 2026 12:00 AM	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Jony Firmansyah	Not Assigned	Jony Firmansyah	Not Assigned
Enclosure Synergy C12000 DRC	c12000	In Use	Apr 1, 2023 12:00 AM	Enclosure	DRC Ariobimo	Not Assigned	Not Assigned	Development	IT	BSS	Enclosure Synergy C12000	Sisco Global Solusi	Not Assigned	SGH310TF20	Kritikal	Asset	Not Assigned	Enclosure	Not Assigned	Information Technology	Synergy 12000 CTO Frame	TBA	Mar 1, 2026 12:00 AM	Mar 1, 2026 12:00 AM	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Jony Firmansyah	Not Assigned	Jony Firmansyah	Not Assigned
Enclosure Synergy C12000 DCI	c12000	In Use	Sep 1, 2023 12:00 AM	Enclosure	DCI Cibitung	Not Assigned	Not Assigned	Production	IT	BSS	HP BladeSystem c12000 Enclosure	Sisco Global Solusi	Not Assigned	SGH310TF1N	Kritikal	Asset	Not Assigned	Enclosure	Not Assigned	Information Technology	Synergy 12000 CTO Frame 10x Fan	31 Desember 2028	Aug 31, 2026 12:00 AM	Aug 31, 2026 12:00 AM	Not Assigned	-	Not Assigned	Not Assigned	Jony Firmansyah	Not Assigned	Jony Firmansyah	Not Assigned`;

export function maskUser(user: string): string {
  if (!user || user.toLowerCase().includes('not assigned') || user.toLowerCase().includes('unassigned')) {
    return 'IT Operations';
  }
  const parts = user.split(' ');
  return parts.map(p => {
    if (p.length <= 2) return p;
    return p[0] + '*'.repeat(p.length - 2) + p[p.length - 1];
  }).join(' ');
}

export function maskSerialNumber(sn: string): string {
  if (!sn || sn.toLowerCase().includes('not') || sn.toLowerCase().includes('n/a')) return 'SN-MASKED-ENC';
  if (sn.length <= 4) return '****';
  return sn.substring(0, 3) + '****' + sn.substring(sn.length - 2);
}

export function parseImportedEnclosuresTSV(): Asset[] {
  const lines = RAW_ENCLOSURES_TSV.trim().split('\n');
  const assets: Asset[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const cols = line.split('\t');
    if (cols.length < 15) continue;

    const ciName = cols[0] || '';
    const productName = cols[1] || '';
    const assetState = cols[2] || 'In Use';
    const acquisitionDateRaw = cols[3] || '';
    const locationRaw = cols[5] || '';
    const vendorRaw = cols[12] || '';
    const serialNumberRaw = cols[14] || '';
    const criticalityRaw = cols[15] || 'Kritikal';
    const descriptionRaw = cols[21] || '';
    const expiryDateRaw = cols[24] || '';
    const userRaw = cols[29] || '';

    // ID mapping
    const id = `CI-ENC-${(i + 1).toString().padStart(3, '0')}`;
    
    // Category mapping -> 'Server & Storage'
    const category = 'Server & Storage';

    // Status mapping
    const status = 'Active';

    // Criticality Mapping
    let criticality = 'Medium';
    if (criticalityRaw.toLowerCase().includes('kritikal') || criticalityRaw.toLowerCase().includes('critical') || criticalityRaw.toLowerCase().includes('high')) {
      criticality = 'Critical';
    } else if (criticalityRaw.toLowerCase().includes('low') || criticalityRaw.toLowerCase().includes('non')) {
      criticality = 'Low';
    }

    const expiryDate = parseDomainDate(expiryDateRaw);
    const lastUpdated = parseDomainDate(acquisitionDateRaw) !== 'Not Assigned' ? parseDomainDate(acquisitionDateRaw) : '2026-06-11';

    // Check if within 90 days (H-90 Alert)
    // Reference June 11, 2026. H-90 is June 11 to Sep 9, 2026.
    const isWithin90Days = expiryDate >= '2026-06-11' && expiryDate <= '2026-09-09';

    // Name mapping (Masked in case of SLA H-90 Alert as requested to protect raw information)
    const name = isWithin90Days ? maskSensitiveName(ciName) : ciName;

    // Always mask user and serial numbers for real office data as requested:
    // "yang 90 hari di masking aja" -> can apply to all real enclosure rows, particularly those in 90 days.
    // Let's mask all values for high security.
    const serialNumber = maskSerialNumber(serialNumberRaw);
    const user = maskUser(userRaw);
    const assetTag = `TAG-ENC-${serialNumber.toUpperCase()}`;

    const vendorLabel = vendorRaw && vendorRaw !== 'Not Assigned' ? vendorRaw : 'Not Assigned';
    let notes = `Blade Enclosure: ${descriptionRaw || productName}. Vendor: ${vendorLabel}.`;
    if (isWithin90Days) {
      notes = maskNotesSensitiveData(notes);
      notes += ` [Status: H-90 SLA / Data Real Kantor Terproteksi]`;
    }

    assets.push({
      id,
      name,
      category,
      serialNumber,
      assetTag,
      location: locationRaw,
      user,
      criticality,
      status,
      source: 'Both',
      expiryDate,
      eolDate: '2031-12-31',
      notes,
      lastUpdated
    });
  }

  return assets;
}

export function isH90Asset(expiryDateStr: string): boolean {
  if (!expiryDateStr || expiryDateStr === 'N/A' || expiryDateStr === 'Jan 1, 2024') return false;
  try {
    const exp = new Date(expiryDateStr);
    if (isNaN(exp.getTime())) return false;
    const today = new Date('2026-06-11');
    const diffTime = exp.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // Expired (less than 0 days left) or expiring within 90 days
    return diffDays <= 90;
  } catch (e) {
    return false;
  }
}

export function maskSensitiveName(nameStr: string): string {
  if (!nameStr) return '';
  if (nameStr.includes('.') || nameStr.startsWith('*')) {
    const parts = nameStr.split('.');
    return parts.map((part, idx) => {
      if (idx === parts.length - 1) return part; // keep extension like .com / .co.id
      if (part === '*') return '*'; // keep wildcard
      if (part.length <= 2) return part[0] + '*';
      return part.substring(0, 2) + '*'.repeat(part.length - 2);
    }).join('.');
  }
  if (nameStr.length <= 3) return nameStr[0] + '*';
  return nameStr.substring(0, 3) + '*'.repeat(Math.max(3, nameStr.length - 3));
}

export function maskNotesSensitiveData(notesStr: string): string {
  if (!notesStr) return '';
  let masked = notesStr;
  masked = masked.replace(/https?:\/\/[^\s)]+/gi, '[URL_TERPROTEKSI]');
  masked = masked.replace(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, '[IP_TERPROTEKSI]');
  return masked;
}

export const RAW_SSL_TSV = `*.pdaja.com	Wildcard SSL	*.pdaja.com	In Use	Sep 27, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	setup on F5 (Beli 2 thn\` issue ke-1 Okt 2024\` harus reissue Sep 2024)	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
star.banksampoerna.co.id	Wildcard SSL	*.banksampoerna.co.id	In Use	Dec 6, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	setup on F5	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
donevm	Wildcard SSL	*.banksampoerna.co.id	In Use	Dec 6, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://donevm.banksampoerna.co.id:8443/ePROCure/login.htm\\n10.195.28.94	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
eform	Wildcard SSL	*.banksampoerna.co.id	In Use	Dec 6, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Eform prod\\nhttps://eform.banksampoerna.co.id:8443/cms/index.php/login\\nEKSTERNAL DAN INTERNAL SERVER	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
Centralized Checking	Wildcard SSL	*.banksampoerna.com	In Use	May 10, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	https://www.banksampoerna.com/institusi-keuangan-dan-korporasi/e-kyc	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://10.195.28.60/CSC/Account/Login	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
OpenBanking	WildcardSSL	*.banksampoerna.co.id	In Use	Dec 6, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	(ob-dev.banksampoerna.co.id ob-sandbox.banksampoerna.co.id) (additional setting on F5\` check URL F5) (ob-partner-uat.banksampoerna.co.id) (ob-partner-sandbox.banksampoerna.co.id) (ob-api.banksampoerna.co.id)(developer.banksampoerna.co.id)	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
FMS / EMS	Wildcard SSL	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://ems.banksampoerna.com/	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
ibank	EV SSL	ibank.banksampoerna.co.id	In Use	Apr 13, 2027 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Internet Banking\` setup on F5 and App (Maret 2025\` reissue h-30 sblm habis pada 22 Maret 2026)	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
Sampoerna Mobile Banking	EV SSL	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://sampoernamobile.banksampoerna.com	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
VA	EV SSL	ibank.banksampoerna.co.id	In Use	Dec 6, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	use by VA\` setup on F5 and APP (Maret 2025\` reissue h-30 sblm habis pada 22 Maret 2026)	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
Sampoerna Mobile Merchant	EV SSL	ibank.banksampoerna.co.id	In Use	Dec 6, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	use by SMM\` setup on APP (Maret 2025\` reissue h-30 sblm habis pada 22 Maret 2026)	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
www	Wildcard SSL	*.banksampoerna.com	In Use	May 3, 2028 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	www.banksampoerna.com	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
star.banksampoerna.com	Wildcard SSL	*.banksampoerna.co.id	In Use	Feb 2, 2028 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	setup on F5	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
Payslip	Wildcard SSL	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://payslip.banksampoerna.com:8085/Login	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
HC Portal	Wildcard SSL	*.banksampoerna.com	In Use	May 10, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	hcportal.banksampoerna.com:8085\`	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
HC3	Wildcard SSL	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://hc3.banksampoerna.com:8083/eform	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
Efilling	Wildcard SSL	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://efilinghc.banksampoerna.com:8081/login.php	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
Mantap	Wildcard SSL	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://mantap.banksampoerna.com:8082/Login	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
Career	Wildcard SSL	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://career.banksampoerna.com	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
iColls	Wildcard SSL	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Mobile collsys	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
done	Wildcard SSL	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	donehttps://done.banksampoerna.com:8443/ePROCure/index.htm	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
CRMA	Wildcard SSL	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	setup on Server	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
ekyc admin panel	Wildcard SSL	*.banksampoerna.com	In Use	May 10, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Ekyc\` GCP non WAF\` XFERS server (ekyc-adminpanel.banksampoerna.com/login)	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
ekyc jitsi	Wildcard SSL	*.banksampoerna.com	In Use	May 10, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Ekyc Dev\` GCP non WAF\` \` XFERS server (https://dev-ekyc-jitsi.banksampoerna.com) (https://ekyc-jitsi.banksampoerna.com)	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
Portal	Wildcard SSL	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	setup server	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
ekyc	Wildcard SSL	*.banksampoerna.com	In Use	May 10, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	manual inject di NGINX Bastion & Server 10.195.234.119\\nhttps://ekyc.banksampoerna.com	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
PAM	Wildcard SSL	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Apply on F5 & Serverhttps://pam.banksampoerna.com/PasswordVault/v10/logon/	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
Insurance System	Wildcard SSL	*.banksampoerna.co.id	In Use	Dec 6, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	apply on f5https://isbss.banksampoerna.co.id	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
eKYC V1.A	Wildcard SSL	*.banksampoerna.co.id	In Use	Dec 6, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://neo-ekyc-adminpanel.banksampoerna.co.id/	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
propertygeotag	Wildcard SSL	*.banksampoerna.com	In Use	May 10, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://propertygeotag.banksampoerna.com/login	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
New LOS Satu	Wildcard SSL	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://satu.banksampoerna.com/?ReturnUrl=/TPMS	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
iDEB	Wildcard SSL	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://ideb.banksampoerna.com/	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
elibrary	Wildcard SSL	*.banksampoerna.com	In Use	May 10, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://elibrary.banksampoerna.com/ui/core/index.html#/	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
Ecentrix	Wildcard SSL	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://contact-center.banksampoerna.com/ecentrix_helpdesk/login	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
wave.banksampoerna.com	Wildcard SSL	*.banksampoerna.com	In Use	Jan 7, 2027 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
*.banksampoerna.com	Wildcard SSL	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	SSL Indonesia	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
*.banksampoerna.co.id	Wildcard SSL	*.banksampoerna.co.id	In Use	Dec 6, 2026 12:00 AM	Seraphim	BSS	Not Assigned	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned
siias	Wildcard SSL Certificate	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	PT. Glous Tech Info	BSS	Apr 29, 2026 12:00 AM	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	IP Apps: 10.195.234.21\\nIP DB: 10.195.234.22	Not Assigned	Not Assigned	Not Assigned	Not Assigned	aplikasi Electronic Working Paper pada new portal SIIAS (Sampoerna Integrated Internal Audit System)	https://siias.banksampoerna.com	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	DigiCert	Arif Bambang Prasetyo	Not Assigned
sampoernabusiness	Wildcard SSL	sampoernabusiness.com	In Use	May 6, 2028 12:00 AM	Digicert	BSS	May 6, 2026 12:00 AM	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	https://sampoernabusiness.com	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Digicert	Arif Bambang Prasetyo	Not Assigned
simba	Wildcard SSL Certificate	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	PT. Glous Tech Info	BSS	Apr 29, 2026 12:00 AM	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://simba.banksampoerna.com	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	DigiCert	Arif Bambang Prasetyo	Not Assigned
caats	Wildcard SSL Certificate	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	PT. Glous Tech Info	BSS	Apr 29, 2026 12:00 AM	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://caats.banksampoerna.com	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	DigiCert	Arif Bambang Prasetyo	Not Assigned
simba-dev	Wildcard SSL Certificate	*.banksampoerna.com	In Use	Nov 19, 2026 12:00 AM	PT. Glous Tech Info	BSS	Apr 29, 2026 12:00 AM	IT	Not Assigned	Asset	Not Assigned	Not Assigned	Not Assigned	Not Assigned	SSL License	-	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	https://simba-dev.banksampoerna.com	Not Assigned	Not Assigned	HO	-	Not Assigned	SSL License	Not Assigned	-	Not Assigned	Not Assigned	Kantor Pusat	Kritikal	-	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Not Assigned	DigiCert	Arif Bambang Prasetyo	Not Assigned`;

export function parseImportedSSLsTSV(): Asset[] {
  const lines = RAW_SSL_TSV.trim().split('\n');
  const assets: Asset[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const cols = line.split('\t');
    if (cols.length < 10) continue;

    const rawCiName = cols[0] || '';
    const productName = cols[1] || 'Wildcard SSL';
    const sslType = cols[2] || '';
    const assetState = cols[3] || 'In Use';
    const rawExpiryDate = cols[4] || '';
    const vendorRaw = cols[5] || 'Seraphim';
    const acquisitionRaw = cols[7] || '';
    const descRaw = cols[18] && cols[18] !== 'Not Assigned' ? cols[18] : '';
    const ketRaw = cols[24] && cols[24] !== 'Not Assigned' ? cols[24] : '';
    const locationRaw = cols[27] || 'HO';
    const siteRaw = cols[35] || 'Kantor Pusat';
    const criticalityRaw = cols[36] || 'Kritikal';
    const userRaw = cols[39] || cols[48] || 'Arif Bambang Prasetyo';

    const cleanExpiryDate = parseDomainDate(rawExpiryDate);
    const isH90 = isH90Asset(cleanExpiryDate);

    // Dynamic Masking if expiring in 90 days
    const name = isH90 ? maskSensitiveName(rawCiName) : rawCiName;
    const user = isH90 ? maskUser(userRaw) : userRaw;
    const serialNumber = isH90 ? 'SN-MASKED-SSL' : `SN-SSL-${rawCiName.toUpperCase()}`;
    const assetTag = isH90 ? `TAG-SSL-${maskSensitiveName(rawCiName).toUpperCase()}` : `TAG-SSL-${rawCiName.toUpperCase()}`;

    // Locations mapping
    const location = siteRaw && siteRaw !== 'Not Assigned' ? siteRaw : (locationRaw === 'HO' ? 'Kantor Pusat' : locationRaw);

    let notes = '';
    if (descRaw) notes += `Deskripsi: ${descRaw}. `;
    if (ketRaw) notes += `Keterangan: ${ketRaw}. `;
    if (!notes) notes = `Tipe SSL: ${sslType || productName}. Vendor: ${vendorRaw}.`;

    if (isH90) {
      notes = maskNotesSensitiveData(notes);
      notes += ` [SLA ALERT H-90 / Data Real Terproteksi]`;
    }

    // Criticality Mapping
    let criticality = 'Medium';
    if (criticalityRaw.toLowerCase().includes('kritikal') || criticalityRaw.toLowerCase().includes('critical') || criticalityRaw.toLowerCase().includes('high')) {
      criticality = 'Critical';
    } else if (criticalityRaw.toLowerCase().includes('low') || criticalityRaw.toLowerCase().includes('non')) {
      criticality = 'Low';
    }

    const id = `CI-SSL-${(i + 1).toString().padStart(3, '0')}`;
    const lastUpdated = parseDomainDate(acquisitionRaw) !== 'Not Assigned' ? parseDomainDate(acquisitionRaw) : '2026-06-11';

    assets.push({
      id,
      name,
      category: 'Perangkat Lunak Komputer', // SSL is categorised under PC Software Licenses inside CoreCMDB
      serialNumber,
      assetTag,
      location,
      user,
      criticality,
      status: 'Active',
      source: 'Both',
      expiryDate: cleanExpiryDate,
      eolDate: '2031-12-31',
      notes,
      lastUpdated
    });
  }

  return assets;
}

export const RAW_SECURITY_DEVICES_TSV = `BSSPS10KITMDR	Hardware Security Module	In Use	Jul 18, 2026 12:00 AM	TBA	Jul 18, 2026 12:00 AM	BSS	Sisco Global Solusi	10.196.234.237	S0248411265P	Mar 1, 2022 12:00 AM	DRC Ariobimo	Kritikal	HSM Core Banking New\\nDRC	Not Assigned	IT	Not Assigned	Security Device	Information Technology	Not Assigned	DRC	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
Thales PIN MAILER	Hardware Security Module	In Use	Jul 18, 2025 12:00 AM	TBA	Jul 18, 2026 12:00 AM	BSS	Dymar	10.199.122.8	S0248410295R	Jul 19, 2024 12:00 AM	HO	Kritikal	HSM Development	10.199.122.8	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
Thales PS10-S0248410305C	Hardware Security Module	In Use	Jul 18, 2026 12:00 AM	TBA	Jul 18, 2026 12:00 AM	BSS	Dymar	10.199.122.11	S0248410305C	Not Assigned	HO	Kritikal	HSM Pinmailer	Not Assigned	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
DCI-IB	Palo Alto PA-440	In Use	Dec 4, 2025 12:00 AM	TBA	Dec 4, 2025 12:00 AM	BSS	MSI	10.195.24.6	21201119511	Not Assigned	DCI Cibutung	Kritikal	Firewall Palo IB DC	To be renewed	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
RMP-IB	Palo Alto PA-440	In Use	Dec 4, 2025 12:00 AM	TBA	Dec 4, 2025 12:00 AM	BSS	MSI	10.196.24.6	21201119472	Not Assigned	DRC Ariobimo	Kritikal	Not Assigned	To be renewed	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
VA HA DCI	Palo Alto PA-820	In Use	Jan 9, 2026 12:00 AM	31/08/2029	Jan 9, 2026 12:00 AM	BSS	MSI	10.195.24.81	12001021631	Not Assigned	DCI Cibutung	Kritikal	Firewall Palo VA DC	9.0.5	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
VA HA RMP	Palo Alto PA-820	In Use	Jan 9, 2026 12:00 AM	31 Agustus 2029	Jan 9, 2026 12:00 AM	BSS	MSI	10.196.24.81	12001021562	Not Assigned	DRC Ariobimo	Kritikal	Firewall Palo VA DRC	Akan direnewal	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
DCI-TASAKU	Palo Alto PA-440	In Use	Dec 4, 2025 12:00 AM	TBA	Dec 4, 2025 12:00 AM	BSS	MSI	10.195.24.8	21201119498	Not Assigned	DCI Cibutung	Kritikal	Firewall Palo Saku DC	To be renewed	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
RMP-TASAKU	Palo Alto PA-440	In Use	Dec 4, 2025 12:00 AM	TBA	Dec 4, 2025 12:00 AM	BSS	MSI	10.196.24.8	21201119512	Not Assigned	DRC Ariobimo	Kritikal	Not Assigned	To be renewed	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
BSS-DCI-CPMGMT	Checkpoint CPAP-NGSM625 / Smart1-625	In Use	Nov 28, 2025 12:00 AM	01/09/2026	Nov 28, 2025 12:00 AM	BSS	MSI	10.195.24.10	47CZLF3	Not Assigned	DCI Cibutung	Kritikal	Management Checkpoint DC	to be decommissioned	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
SEC-GROUP-MAESTRO-DCI	Checkpoint CPAP-SG6400	In Use	Nov 28, 2025 12:00 AM	TBA	Nov 28, 2025 12:00 AM	BSS	MSI	10.195.24.106	2127BA35742127BA3563	Not Assigned	DCI Cibutung	Kritikal	Firewall / Security Gateway 2 DC	To be renewed	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
BSS-MAESTRO-ORC-DCI	Checkpoint CPAP-MHO-140	In Use	Nov 28, 2025 12:00 AM	TBA	Nov 28, 2025 12:00 AM	BSS	MSI	10.195.24.105	MT2113X17523	Not Assigned	DCI Cibutung	Kritikal	Maestro Orchestrator Checkpoint DC	To be renewed	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
BSS-SS	Checkpoint CPAP-SG6200	In Use	Nov 28, 2025 12:00 AM	TBA	Nov 28, 2025 12:00 AM	BSS	MSI	10.199.0.10	2133BA1535	Not Assigned	HO	Kritikal	Not Assigned	To be renewed	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
MAESTRO-MGMT-RMP	Checkpoint CPAP-NGSM600 / Smart1-600	In Use	Nov 28, 2025 12:00 AM	01/01/2032	Nov 28, 2025 12:00 AM	BSS	MSI	10.196.24.104	DC92DN3	Not Assigned	DRC Ariobimo	Kritikal	Not Assigned	to be decommissioned	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
[01] SEC-GROUP-MAESTRO-RMP	Checkpoint CPAP-SG6400	In Use	Nov 28, 2025 12:00 AM	TBA	Nov 28, 2025 12:00 AM	BSS	MSI	10.196.24.106	2208BA1143	Not Assigned	DRC Ariobimo	Kritikal	Not Assigned	To be renewed	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
BSS-MAESTRO-ORC-RMP	Checkpoint CPAP-MHO-140	In Use	Nov 28, 2025 12:00 AM	TBA	Nov 28, 2025 12:00 AM	BSS	MSI	10.196.24.105	MT2211X09858	Not Assigned	DRC Ariobimo	Kritikal	Not Assigned	Akan di renewal	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
FW-BSS-DCI-VA-T2	Checkpoint SG5200	In Use	Dec 31, 2025 12:00 AM	01/12/2025	Dec 31, 2025 12:00 AM	BSS	MSI	Not Assigned	1826BA0755	Not Assigned	DCI Cibutung	Kritikal	Not Assigned	Tidak diperpanjang (non-renewal – end of support)	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
FW-BSS-RMP-VA-T2 -> BSS-CP-ALFA-SAT	Checkpoint SG5200	In Use	Dec 31, 2025 12:00 AM	01/12/2025	Dec 31, 2025 12:00 AM	BSS	MSI	10.195.20.5	1826BA0629	Not Assigned	DC Alfa	Kritikal	Not Assigned	Tidak diperpanjang (non-renewal – end of support)	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
FW-BSS-DCI-BI	Juniper SRX340	In Use	Dec 16, 2026 12:00 AM	TBA	Mar 16, 2026 12:00 AM	BSS	Sisco Global Solusi	10.195.24.85	CY0623AN0230	Not Assigned	DCI Cibutung	Kritikal	Firewall ke BI DC	Not Assigned	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
FW-BSS-RMP-BI	Juniper SRX340	In Use	Dec 16, 2026 12:00 AM	TBA	Mar 16, 2026 12:00 AM	BSS	Sisco Global Solusi	10.196.24.85	CY0623AN0082	Not Assigned	DRC Rempoa	Kritikal	Firewall ke BI DRC	Not Assigned	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
SRX380	Juniper SRX380	In Use	Not Assigned	Not Assigned	Not Assigned	BSS	FDS	-	EW2623AN0031	Not Assigned	DCI Cibitung	Kritikal	Not Assigned	EOS & EOL TBA	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Risna Andriawan Siatan	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Risna Andriawan Siatan
[02] SEC-GROUP-MAESTRO-RMP	Checkpoint CPAP-SG6400	In Use	Nov 28, 2025 12:00 AM	TBA	Nov 28, 2025 12:00 AM	BSS	MSI	10.196.24.106	2208BA1141	Not Assigned	DRC Rempoa	Kritikal	Not Assigned	To be renewed	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
[01] Juniper SRX345	Juniper	In Use	Not Assigned	Not Assigned	Not Assigned	BSS	Sisco Global Solusi	-	Not Assigned	Not Assigned	Not Assigned	Kritikal	Not Assigned	Not Assigned	IT	NTWDR019	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
[02] Juniper SRX345	Juniper	In Use	Not Assigned	Not Assigned	Not Assigned	BSS	Sisco Global Solusi	-	Not Assigned	Not Assigned	DRC Rempoa	Kritikal	Not Assigned	Not Assigned	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
THALES LUNA HSM SA 7	Hardware Security Module	In Use	Not Assigned	Not Assigned	Not Assigned	BSS	Master System Infotama	Not Assigned	642298	Not Assigned	DCI Cibutung	Kritikal	Not Assigned	Not Assigned	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Security	Not Assigned	Jony Firmansyah	Not Assigned	Not Assigned	1	Not Assigned	Jony Firmansyah
THALES LUNA HSM SA 7 - Development	Hardware Security Module	In Use	Not Assigned	Not Assigned	Not Assigned	BSS	Master System Infotama	Not Assigned	642329	Not Assigned	DRC Ariobimo	Kritikal	Not Assigned	Not Assigned	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Security	Not Assigned	Jony Firmansyah	Not Assigned	Not Assigned	1	Not Assigned	Jony Firmansyah
THALES LUNA HSM SA7	Hardware Security Module	In Use	Not Assigned	Not Assigned	Not Assigned	BSS	Master System Infotama	Not Assigned	642326	Not Assigned	DRC Ariobimo	Kritikal	Not Assigned	Not Assigned	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Security	Not Assigned	Jony Firmansyah	Not Assigned	Not Assigned	1	Not Assigned	Jony Firmansyah
Check Point M1	Firewall	In Use	Not Assigned	Not Assigned	Not Assigned	BSS	Not Assigned	-	Not Assigned	Not Assigned	HO	Kritikal	Not Assigned	Not Assigned	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Firewall	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo
Juniper SRX 300	Firewall	In Use	Not Assigned	Not Assigned	Not Assigned	BSS	Not Assigned	-	Not Assigned	Not Assigned	HO	Kritikal	Not Assigned	Not Assigned	IT	Not Assigned	Security Device	Information Technology	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo	Not Assigned	Not Assigned	Not Assigned	Not Assigned	Arif Bambang Prasetyo`;

export function parseImportedSecurityDevicesTSV(): Asset[] {
  const lines = RAW_SECURITY_DEVICES_TSV.trim().split('\n');
  const assets: Asset[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const cols = line.split('\t');
    if (cols.length < 10) continue;

    const rawCiName = cols[0] || '';
    const productName = cols[1] || '';
    const assetState = cols[2] || 'In Use';
    const endOfSupport = cols[3] || 'Not Assigned';
    const endOfLife = cols[4] || 'TBA';
    const rawExpiryDate = cols[5] || '';
    const vendorRaw = cols[7] || '';
    const ipAddress = cols[8] || '';
    const serialNumberRaw = cols[9] || '';
    const acquisitionRaw = cols[10] || '';
    const locationRaw = cols[11] || 'Kantor Pusat';
    const criticalityRaw = cols[12] || 'Kritikal';
    const kegunaanRaw = cols[13] || '';
    const keteranganRaw = cols[14] || '';
    const assetTagRaw = cols[16] || '';
    const userRaw = cols[23] || 'Arif Bambang Prasetyo';

    const cleanExpiryDate = parseDomainDate(rawExpiryDate);
    const isH90 = isH90Asset(cleanExpiryDate);

    // Masking if expired/expiring in 90 days (H-90 rule)
    const name = isH90 ? maskSensitiveName(rawCiName) : rawCiName;
    const user = isH90 ? maskUser(userRaw) : userRaw;
    const serialNumber = isH90 ? maskSerialNumber(serialNumberRaw) : (serialNumberRaw && serialNumberRaw !== 'Not Assigned' ? serialNumberRaw : `SN-SEC-${rawCiName.toUpperCase()}`);
    const assetTag = isH90 ? `TAG-SEC-${maskSensitiveName(rawCiName).toUpperCase()}` : (assetTagRaw && assetTagRaw !== 'Not Assigned' ? assetTagRaw : `TAG-SEC-${rawCiName.toUpperCase()}`);

    // Map location
    const location = locationRaw === 'HO' ? 'Kantor Pusat' : locationRaw;

    // Building notes
    let notes = `Product: ${productName}. `;
    if (kegunaanRaw && kegunaanRaw !== 'Not Assigned') {
      notes += `Kegunaan: ${kegunaanRaw.replace(/\\\\n/g, ' / ').replace(/\\n/g, ' / ')}. `;
    }
    if (keteranganRaw && keteranganRaw !== 'Not Assigned') {
      notes += `Keterangan: ${keteranganRaw}. `;
    }
    if (ipAddress && ipAddress !== 'Not Assigned' && ipAddress !== '-') {
      notes += `IP: ${ipAddress}. `;
    }
    if (endOfSupport && endOfSupport !== 'Not Assigned') {
      notes += `EOS: ${endOfSupport}. `;
    }
    if (endOfLife && endOfLife !== 'Not Assigned' && endOfLife !== 'TBA') {
      notes += `EOL: ${endOfLife}. `;
    }

    if (isH90) {
      notes = maskNotesSensitiveData(notes);
      notes += ` [SLA ALERT H-90 / Data Real Terproteksi]`;
    }

    // Criticality Mapping
    let criticality = 'Medium';
    if (criticalityRaw.toLowerCase().includes('kritikal') || criticalityRaw.toLowerCase().includes('critical') || criticalityRaw.toLowerCase().includes('high')) {
      criticality = 'Critical';
    } else if (criticalityRaw.toLowerCase().includes('low') || criticalityRaw.toLowerCase().includes('non')) {
      criticality = 'Low';
    }

    const id = `CI-SEC-${(i + 1).toString().padStart(3, '0')}`;
    const lastUpdated = parseDomainDate(acquisitionRaw) !== 'Not Assigned' ? parseDomainDate(acquisitionRaw) : '2026-06-11';

    assets.push({
      id,
      name,
      category: 'Perangkat Jaringan & Keamanan',
      serialNumber,
      assetTag,
      location,
      user,
      criticality,
      status: 'Active',
      source: 'Both',
      expiryDate: cleanExpiryDate,
      eolDate: parseDomainDate(endOfSupport) !== '2028-12-31' ? parseDomainDate(endOfSupport) : '2031-12-31',
      notes: notes.trim(),
      lastUpdated
    });
  }

  return assets;
}


