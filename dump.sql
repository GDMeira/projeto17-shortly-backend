--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer,
    token character varying(36),
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    user_id integer NOT NULL,
    url text,
    short_url character varying(10),
    visit_count integer DEFAULT 0,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(60) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (3, 2, '79143423-39cc-4aa3-a4f9-d1fb67b4dc47', '2023-08-03 00:05:47.632755');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (4, 2, 'https://chat.openai.com/c/1f29e092-1c76-435f-8824-a0d919ead5f69', 'Y6NGO_7K', 1, '2023-08-03 00:46:36.340863');
INSERT INTO public.urls VALUES (6, 2, 'https://chat.openai.com/c/1f29e092-1c76-435f-8824-a0d919ead5f691', 'VmIHLLL4', 1, '2023-08-03 00:47:31.973549');
INSERT INTO public.urls VALUES (7, 2, 'https://chat.openai.com/c/1f29e092-1c76-435f-8824-a0d919ead5f6913', 'oN6eTbg6', 1, '2023-08-03 00:47:35.163363');
INSERT INTO public.urls VALUES (8, 2, 'https://chat.openai.com/c/1f29e092-1c76-435f-8824-a0d919ead5f69134', 'bXQ-VRvZ', 1, '2023-08-03 00:47:37.089813');
INSERT INTO public.urls VALUES (9, 2, 'https://chat.openai.com/c/1f29e092-1c76-435f-8824-a0d919ead5f691345', 'cYo_KtVZ', 1, '2023-08-03 00:47:39.788481');
INSERT INTO public.urls VALUES (11, 2, 'https://chat.openai.com/c/1f29e092-1c76-435f-8824-a0d919ead5f6913450', 'J63_6m2r', 1, '2023-08-03 00:49:15.15065');
INSERT INTO public.urls VALUES (15, 2, 'https://chat.openai.com/c/1f29e092-1c76-435f-8824-a0d919ead5f69134500', '4sYZ3W1R', 1, '2023-08-03 00:49:25.71178');
INSERT INTO public.urls VALUES (46, 2, 'https://chat.openai.com/c/1f29e092-1c76-435f-8824-a0d919ead5f691345000', 'Oy1-Yibu', 1, '2023-08-03 00:57:50.387219');
INSERT INTO public.urls VALUES (50, 2, 'https://chat.openai.com/c/1f29e092-1c76-435f-8824-a0d919ead5f6913450001', '3Lu1debL', 1, '2023-08-03 00:59:36.883216');
INSERT INTO public.urls VALUES (51, 2, 'https://chat.openai.com/c/1f29e092-1c76-435f-8824-a0d919ead5f69134500011', 'QK6kdOcr', 1, '2023-08-03 01:04:38.697376');
INSERT INTO public.urls VALUES (1, 2, 'https://chat.openai.com/c/1f29e092-1c76-435f-8824-a0d919ead5f6', 'NT7V3722', 3, '2023-08-03 00:43:32.808377');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (2, 'Joãozinho', 'joao@driven.com.br', '$2b$10$Rd99zrBrACEcxICLVWFgLO5ZGdECFMSbpD9sEJFyVeOuevWtY.Q6O', '2023-08-02 00:21:05.311464');
INSERT INTO public.users VALUES (3, 'Joãozinho', 'joao@driven2.com.br', '$2b$10$z5LXosKK1EWHAhezdnaDTuvsXk7H8rRN1omGG4.t3dBq0nrHuWJ/q', '2023-08-02 00:21:12.161702');
INSERT INTO public.users VALUES (4, 'Joãozinho', 'joao@driven3.com.br', '$2b$10$BuVqWZuEYRT1wn3XtGt8xOlIsJO8XFQ8HuYdrjTZGefIA074vOvi6', '2023-08-02 00:23:19.83351');
INSERT INTO public.users VALUES (5, 'Joãozinho', 'joao@driven4.com.br', '$2b$10$h0ICtHaOKBiZ5shkQq6ezeEUKWE3ChA773PE0oogiETSUHatx9e.W', '2023-08-02 00:23:29.236346');
INSERT INTO public.users VALUES (6, 'Joãozinho', 'joao@driven5.com.br', '$2b$10$P6Izpm7nQ6hhVRHhTNTjwe1dHksvIqtFzW5T1VtcgT2RRbpnEUxz2', '2023-08-02 22:05:58.646135');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 3, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 51, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_key UNIQUE (user_id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_url_key UNIQUE (url);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: urls urls_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

