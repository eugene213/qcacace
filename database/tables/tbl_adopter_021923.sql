PGDMP         '                {         	   db_qcacac    15.1    15.1     9           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            :           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ;           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            <           1262    28480 	   db_qcacac    DATABASE     �   CREATE DATABASE db_qcacac WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Philippines.1252';
    DROP DATABASE db_qcacac;
                postgres    false            �            1259    28486    tbl_adopter    TABLE     �  CREATE TABLE public.tbl_adopter (
    id integer NOT NULL,
    series_no character varying(20),
    email character varying(100),
    code character varying(20),
    fname character varying(100),
    mname character varying(100),
    lname character varying(100),
    gender character varying(20),
    address text,
    contact_no character varying(20),
    date_created timestamp with time zone,
    date_updated timestamp with time zone
);
    DROP TABLE public.tbl_adopter;
       public         heap    postgres    false            �            1259    28498    tbl_adopter_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_adopter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.tbl_adopter_id_seq;
       public          postgres    false    216            =           0    0    tbl_adopter_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.tbl_adopter_id_seq OWNED BY public.tbl_adopter.id;
          public          postgres    false    219            �           2604    28547    tbl_adopter id    DEFAULT     p   ALTER TABLE ONLY public.tbl_adopter ALTER COLUMN id SET DEFAULT nextval('public.tbl_adopter_id_seq'::regclass);
 =   ALTER TABLE public.tbl_adopter ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    216            5          0    28486    tbl_adopter 
   TABLE DATA           �   COPY public.tbl_adopter (id, series_no, email, code, fname, mname, lname, gender, address, contact_no, date_created, date_updated) FROM stdin;
    public          postgres    false    216   S       >           0    0    tbl_adopter_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.tbl_adopter_id_seq', 2, true);
          public          postgres    false    219            �           2606    28566    tbl_adopter tbl_adopter_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.tbl_adopter
    ADD CONSTRAINT tbl_adopter_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.tbl_adopter DROP CONSTRAINT tbl_adopter_pkey;
       public            postgres    false    216            5   �   x�]��n�0E�篰�1�e?�OuDI�$P��X)m��D�2���E���9���Ɗ��ۧ���݆��3�|��<��e�&MqG���-9.�(�'5�̏�j��,��E�������߮�t���+/��
����x�P��l굱0���'O��L��4��3�Z&-�����kc�3���Ga�*ݷ���#��V�@cĤ��[�SA��(��LFB
9Srd��:'G0     