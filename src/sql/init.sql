-- Database: rescueradar

-- DROP DATABASE IF EXISTS rescueradar;

CREATE DATABASE rescueradar
    WITH
    OWNER = postgres
    -- ENCODING = 'UTF8'
    -- LC_COLLATE = 'en_US.UTF-8'
    -- LC_CTYPE = 'en_US.UTF-8'
    -- TABLESPACE = pg_default
    -- CONNECTION LIMIT = -1
    -- IS_TEMPLATE = False;

-- Table: public.hospital

-- DROP TABLE IF EXISTS public.hospital;

CREATE TABLE public.hospital
(
    id character varying(60) COLLATE pg_catalog."default" NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "phoneNumber" bigint NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(200) COLLATE pg_catalog."default" NOT NULL,
    "licenseId" character varying(30) COLLATE pg_catalog."default" NOT NULL,
    capacity integer NOT NULL,
    address character varying(300) COLLATE pg_catalog."default" NOT NULL,
    status character varying(10) COLLATE pg_catalog."default" NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    CONSTRAINT "Hospital_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.hospital
    OWNER to postgres;


-- Table: public.patient

-- DROP TABLE IF EXISTS public.patient;

CREATE TABLE public.patient
(
    id character varying(60) COLLATE pg_catalog."default" NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    gender character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "phoneNumber" integer NOT NULL,
    email character varying(100) COLLATE pg_catalog."default",
    address character varying(200) COLLATE pg_catalog."default",
    "emergencyContact" bigint NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Patient_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.patient
    OWNER to postgres;


-- Table: public.user_request

-- DROP TABLE IF EXISTS public.user_request;

CREATE TABLE public.user_request
(
    id character varying(60) COLLATE pg_catalog."default" NOT NULL,
    "userId" character varying(60) COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    "phoneNumber" integer NOT NULL,
    CONSTRAINT user_request_pkey PRIMARY KEY (id),
    CONSTRAINT user_request_patient_id_fkey FOREIGN KEY ("userId")
        REFERENCES public.patient (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.user_request
    OWNER to postgres;
-- Index: fki_userId

-- DROP INDEX IF EXISTS public."fki_userId";

CREATE INDEX "fki_userId"
    ON public.user_request USING btree
    ("userId" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;