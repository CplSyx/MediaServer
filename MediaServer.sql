USE [master]
GO
/****** Object:  Database [MediaServer]    Script Date: 06/10/2014 00:10:20 ******/
CREATE DATABASE [MediaServer] ON  PRIMARY 
( NAME = N'MovieServer', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL10_50.CPLSYXSQL\MSSQL\DATA\MovieServer.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'MovieServer_log', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL10_50.CPLSYXSQL\MSSQL\DATA\MovieServer_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [MediaServer] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MediaServer].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MediaServer] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [MediaServer] SET ANSI_NULLS OFF
GO
ALTER DATABASE [MediaServer] SET ANSI_PADDING OFF
GO
ALTER DATABASE [MediaServer] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [MediaServer] SET ARITHABORT OFF
GO
ALTER DATABASE [MediaServer] SET AUTO_CLOSE OFF
GO
ALTER DATABASE [MediaServer] SET AUTO_CREATE_STATISTICS ON
GO
ALTER DATABASE [MediaServer] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [MediaServer] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [MediaServer] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [MediaServer] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [MediaServer] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [MediaServer] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [MediaServer] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [MediaServer] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [MediaServer] SET  DISABLE_BROKER
GO
ALTER DATABASE [MediaServer] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [MediaServer] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [MediaServer] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [MediaServer] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [MediaServer] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [MediaServer] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [MediaServer] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [MediaServer] SET  READ_WRITE
GO
ALTER DATABASE [MediaServer] SET RECOVERY SIMPLE
GO
ALTER DATABASE [MediaServer] SET  MULTI_USER
GO
ALTER DATABASE [MediaServer] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [MediaServer] SET DB_CHAINING OFF
GO
/****** Object:  Login [webuser]    Script Date: 06/10/2014 00:10:20 ******/
/* For security reasons the login is created disabled and with a random password. */
CREATE LOGIN [webuser] WITH PASSWORD=N'ÿ[¬°eþuòd²ÿ]Ut%q¢oEf9e¦|Áàºü', DEFAULT_DATABASE=[MovieServer], DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO
ALTER LOGIN [webuser] DISABLE
GO
/****** Object:  Login [NT SERVICE\MSSQL$CPLSYXSQL]    Script Date: 06/10/2014 00:10:20 ******/
CREATE LOGIN [NT SERVICE\MSSQL$CPLSYXSQL] FROM WINDOWS WITH DEFAULT_DATABASE=[master], DEFAULT_LANGUAGE=[us_english]
GO
/****** Object:  Login [NT AUTHORITY\SYSTEM]    Script Date: 06/10/2014 00:10:20 ******/
CREATE LOGIN [NT AUTHORITY\SYSTEM] FROM WINDOWS WITH DEFAULT_DATABASE=[master], DEFAULT_LANGUAGE=[us_english]
GO
/****** Object:  Login [NT AUTHORITY\IUSR]    Script Date: 06/10/2014 00:10:20 ******/
CREATE LOGIN [NT AUTHORITY\IUSR] FROM WINDOWS WITH DEFAULT_DATABASE=[master], DEFAULT_LANGUAGE=[us_english]
GO
/****** Object:  Login [GAMMA\Administrator]    Script Date: 06/10/2014 00:10:20 ******/
CREATE LOGIN [GAMMA\Administrator] FROM WINDOWS WITH DEFAULT_DATABASE=[master], DEFAULT_LANGUAGE=[us_english]
GO
/****** Object:  Login [BUILTIN\Users]    Script Date: 06/10/2014 00:10:20 ******/
CREATE LOGIN [BUILTIN\Users] FROM WINDOWS WITH DEFAULT_DATABASE=[master], DEFAULT_LANGUAGE=[us_english]
GO
/****** Object:  Login [##MS_PolicyTsqlExecutionLogin##]    Script Date: 06/10/2014 00:10:20 ******/
/* For security reasons the login is created disabled and with a random password. */
CREATE LOGIN [##MS_PolicyTsqlExecutionLogin##] WITH PASSWORD=N'$½f¸&£ðÉV=i''àºÔ¸F¶ö¦[ÌnÍR', DEFAULT_DATABASE=[master], DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=ON
GO
ALTER LOGIN [##MS_PolicyTsqlExecutionLogin##] DISABLE
GO
/****** Object:  Login [##MS_PolicyEventProcessingLogin##]    Script Date: 06/10/2014 00:10:20 ******/
/* For security reasons the login is created disabled and with a random password. */
CREATE LOGIN [##MS_PolicyEventProcessingLogin##] WITH PASSWORD=N'só£îÞßù@>P§lÍûN~òÂ¡;Ü¢Ì', DEFAULT_DATABASE=[master], DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=ON
GO
ALTER LOGIN [##MS_PolicyEventProcessingLogin##] DISABLE
GO
USE [MediaServer]
GO
/****** Object:  User [webuser]    Script Date: 06/10/2014 00:10:20 ******/
CREATE USER [webuser] FOR LOGIN [webuser] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [NT SERVICE\MSSQL$CPLSYXSQL]    Script Date: 06/10/2014 00:10:20 ******/
CREATE USER [NT SERVICE\MSSQL$CPLSYXSQL] FOR LOGIN [NT SERVICE\MSSQL$CPLSYXSQL]
GO
/****** Object:  User [NT AUTHORITY\SYSTEM]    Script Date: 06/10/2014 00:10:20 ******/
CREATE USER [NT AUTHORITY\SYSTEM] FOR LOGIN [NT AUTHORITY\SYSTEM] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [BUILTIN\Users]    Script Date: 06/10/2014 00:10:20 ******/
CREATE USER [BUILTIN\Users] FOR LOGIN [BUILTIN\Users]
GO
/****** Object:  Table [dbo].[Movies]    Script Date: 06/10/2014 00:10:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Movies](
	[movieID] [int] IDENTITY(1,1) NOT NULL,
	[imdbID] [nvarchar](50) NOT NULL,
	[imdbTitle] [nvarchar](100) NOT NULL,
	[imdbYear] [int] NOT NULL,
	[imdbGenre] [nvarchar](max) NOT NULL,
	[imdbRating] [decimal](4, 2) NOT NULL,
	[imdbRuntime] [int] NULL,
	[imdbPlot] [nvarchar](max) NULL,
	[moviedbImage] [nvarchar](max) NOT NULL,
	[moviedbID] [nvarchar](50) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
