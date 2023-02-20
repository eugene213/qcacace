PGDMP     5    (                {         	   db_qcacac    15.1    15.1     :           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ;           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            <           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            =           1262    28480 	   db_qcacac    DATABASE     �   CREATE DATABASE db_qcacac WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Philippines.1252';
    DROP DATABASE db_qcacac;
                postgres    false            �            1259    28499    tbl_adopter_payment    TABLE     >  CREATE TABLE public.tbl_adopter_payment (
    id integer NOT NULL,
    series_no character varying(20),
    adopter_id integer,
    method character varying(30),
    amount character varying(20),
    transaction_no character varying(100),
    status character varying(20),
    date_created timestamp with time zone
);
 '   DROP TABLE public.tbl_adopter_payment;
       public         heap    postgres    false            �            1259    28502    tbl_adopter_payment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tbl_adopter_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.tbl_adopter_payment_id_seq;
       public          postgres    false    220            >           0    0    tbl_adopter_payment_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.tbl_adopter_payment_id_seq OWNED BY public.tbl_adopter_payment.id;
          public          postgres    false    221            �           2604    28548    tbl_adopter_payment id    DEFAULT     �   ALTER TABLE ONLY public.tbl_adopter_payment ALTER COLUMN id SET DEFAULT nextval('public.tbl_adopter_payment_id_seq'::regclass);
 E   ALTER TABLE public.tbl_adopter_payment ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220            6          0    28499    tbl_adopter_payment 
   TABLE DATA           ~   COPY public.tbl_adopter_payment (id, series_no, adopter_id, method, amount, transaction_no, status, date_created) FROM stdin;
    public          postgres    false    220   /       ?           0    0    tbl_adopter_payment_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.tbl_adopter_payment_id_seq', 4, true);
          public          postgres    false    221            �           2606    28564 ,   tbl_adopter_payment tbl_adopter_payment_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.tbl_adopter_payment
    ADD CONSTRAINT tbl_adopter_payment_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.tbl_adopter_payment DROP CONSTRAINT tbl_adopter_payment_pkey;
       public            postgres    false    220            �           2606    28617 7   tbl_adopter_payment tbl_adopter_payment_adopter_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tbl_adopter_payment
    ADD CONSTRAINT tbl_adopter_payment_adopter_id_fkey FOREIGN KEY (adopter_id) REFERENCES public.tbl_adopter(id);
 a   ALTER TABLE ONLY public.tbl_adopter_payment DROP CONSTRAINT tbl_adopter_payment_adopter_id_fkey;
       public          postgres    false    220            6   �   x��λ
�@��z�)�%��l�3���A	E"������B��α�W�|����rW�� �:qt���Hv8�vDHd�C� ~
5L���j�/�m�݇�3�a�����:j�ź���>��e'�/�}b�C�S�v�n�o�=1՚+#xMi�c���8�     