--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.1
-- Dumped by pg_dump version 9.5.1

-- Started on 2017-07-17 14:37:58 PDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2423 (class 1262 OID 95968)
-- Name: karmacy; Type: DATABASE; Schema: -; Owner: karmacy
--

CREATE DATABASE karmacy WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE karmacy OWNER TO karmacy;

\connect karmacy

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12623)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2426 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- TOC entry 187 (class 1255 OID 95988)
-- Name: update_timestamps(); Type: FUNCTION; Schema: public; Owner: nicholasclark
--

CREATE FUNCTION update_timestamps() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
      NEW.updated = now() at time zone 'utc';
      RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_timestamps() OWNER TO nicholasclark;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 181 (class 1259 OID 96002)
-- Name: companies; Type: TABLE; Schema: public; Owner: nicholasclark
--

CREATE TABLE companies (
    id uuid NOT NULL,
    name text NOT NULL,
    domain text NOT NULL,
    created timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    is_disabled boolean DEFAULT false NOT NULL
);


ALTER TABLE companies OWNER TO nicholasclark;

--
-- TOC entry 184 (class 1259 OID 96080)
-- Name: polls; Type: TABLE; Schema: public; Owner: nicholasclark
--

CREATE TABLE polls (
    id uuid NOT NULL,
    company_id uuid NOT NULL,
    team_id uuid,
    user_id uuid NOT NULL,
    instance_id uuid NOT NULL,
    question_id uuid NOT NULL,
    title text NOT NULL,
    question text NOT NULL,
    answer text,
    suggestion text,
    is_complete boolean DEFAULT true NOT NULL,
    expires timestamp without time zone,
    created timestamp without time zone NOT NULL,
    updated timestamp without time zone NOT NULL,
    is_disabled boolean DEFAULT false NOT NULL
);


ALTER TABLE polls OWNER TO nicholasclark;

--
-- TOC entry 182 (class 1259 OID 96035)
-- Name: products; Type: TABLE; Schema: public; Owner: nicholasclark
--

CREATE TABLE products (
    id uuid NOT NULL,
    company_id uuid NOT NULL,
    team_id uuid,
    name text NOT NULL,
    description text NOT NULL,
    price double precision DEFAULT 0.0 NOT NULL,
    quantity integer DEFAULT 0 NOT NULL,
    created timestamp without time zone NOT NULL,
    updated timestamp without time zone NOT NULL,
    is_disabled boolean DEFAULT false NOT NULL
);


ALTER TABLE products OWNER TO nicholasclark;

--
-- TOC entry 183 (class 1259 OID 96056)
-- Name: questions; Type: TABLE; Schema: public; Owner: nicholasclark
--

CREATE TABLE questions (
    id uuid NOT NULL,
    company_id uuid NOT NULL,
    team_id uuid,
    name text NOT NULL,
    title text NOT NULL,
    question_type text NOT NULL,
    options jsonb DEFAULT '{}'::jsonb NOT NULL,
    "position" integer DEFAULT 0 NOT NULL,
    created timestamp without time zone NOT NULL,
    updated timestamp without time zone NOT NULL,
    is_disabled boolean DEFAULT false NOT NULL
);


ALTER TABLE questions OWNER TO nicholasclark;

--
-- TOC entry 185 (class 1259 OID 96091)
-- Name: teams; Type: TABLE; Schema: public; Owner: nicholasclark
--

CREATE TABLE teams (
    id uuid NOT NULL,
    company_id uuid NOT NULL,
    parent_id uuid,
    name text NOT NULL,
    created timestamp without time zone NOT NULL,
    updated timestamp without time zone NOT NULL,
    is_disabled boolean DEFAULT false NOT NULL
);


ALTER TABLE teams OWNER TO nicholasclark;

--
-- TOC entry 186 (class 1259 OID 96101)
-- Name: transactions; Type: TABLE; Schema: public; Owner: nicholasclark
--

CREATE TABLE transactions (
    id uuid NOT NULL,
    company_id uuid NOT NULL,
    user_id uuid,
    amount double precision DEFAULT 0 NOT NULL,
    message text NOT NULL,
    type text NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
    created timestamp without time zone NOT NULL,
    updated timestamp without time zone NOT NULL,
    is_disabled boolean DEFAULT false NOT NULL
);


ALTER TABLE transactions OWNER TO nicholasclark;

--
-- TOC entry 2288 (class 2606 OID 96012)
-- Name: pk_companies; Type: CONSTRAINT; Schema: public; Owner: nicholasclark
--

ALTER TABLE ONLY companies
    ADD CONSTRAINT pk_companies PRIMARY KEY (id);


--
-- TOC entry 2294 (class 2606 OID 96089)
-- Name: pk_polls; Type: CONSTRAINT; Schema: public; Owner: nicholasclark
--

ALTER TABLE ONLY polls
    ADD CONSTRAINT pk_polls PRIMARY KEY (id);


--
-- TOC entry 2290 (class 2606 OID 96045)
-- Name: pk_products; Type: CONSTRAINT; Schema: public; Owner: nicholasclark
--

ALTER TABLE ONLY products
    ADD CONSTRAINT pk_products PRIMARY KEY (id);


--
-- TOC entry 2292 (class 2606 OID 96066)
-- Name: pk_questions; Type: CONSTRAINT; Schema: public; Owner: nicholasclark
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT pk_questions PRIMARY KEY (id);


--
-- TOC entry 2296 (class 2606 OID 96099)
-- Name: pk_teams; Type: CONSTRAINT; Schema: public; Owner: nicholasclark
--

ALTER TABLE ONLY teams
    ADD CONSTRAINT pk_teams PRIMARY KEY (id);


--
-- TOC entry 2298 (class 2606 OID 96111)
-- Name: pk_transactions; Type: CONSTRAINT; Schema: public; Owner: nicholasclark
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT pk_transactions PRIMARY KEY (id);


--
-- TOC entry 2299 (class 2620 OID 96017)
-- Name: trigger_companies; Type: TRIGGER; Schema: public; Owner: nicholasclark
--

CREATE TRIGGER trigger_companies BEFORE INSERT OR UPDATE ON companies FOR EACH ROW EXECUTE PROCEDURE update_timestamps();


--
-- TOC entry 2302 (class 2620 OID 96090)
-- Name: trigger_polls; Type: TRIGGER; Schema: public; Owner: nicholasclark
--

CREATE TRIGGER trigger_polls AFTER INSERT OR UPDATE ON polls FOR EACH ROW EXECUTE PROCEDURE update_timestamps();


--
-- TOC entry 2300 (class 2620 OID 96046)
-- Name: trigger_products; Type: TRIGGER; Schema: public; Owner: nicholasclark
--

CREATE TRIGGER trigger_products AFTER INSERT OR UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_timestamps();


--
-- TOC entry 2301 (class 2620 OID 96067)
-- Name: trigger_questions; Type: TRIGGER; Schema: public; Owner: nicholasclark
--

CREATE TRIGGER trigger_questions AFTER INSERT OR UPDATE ON questions FOR EACH ROW EXECUTE PROCEDURE update_timestamps();


--
-- TOC entry 2303 (class 2620 OID 96100)
-- Name: trigger_teams; Type: TRIGGER; Schema: public; Owner: nicholasclark
--

CREATE TRIGGER trigger_teams AFTER INSERT OR UPDATE ON teams FOR EACH ROW EXECUTE PROCEDURE update_timestamps();


--
-- TOC entry 2304 (class 2620 OID 96112)
-- Name: trigger_transactions; Type: TRIGGER; Schema: public; Owner: nicholasclark
--

CREATE TRIGGER trigger_transactions AFTER INSERT OR UPDATE ON transactions FOR EACH ROW EXECUTE PROCEDURE update_timestamps();


--
-- TOC entry 2425 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2017-07-17 14:37:58 PDT

--
-- PostgreSQL database dump complete
--

