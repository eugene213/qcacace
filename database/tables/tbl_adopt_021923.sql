PGDMP     -    &                {         	   db_qcacac    15.1    15.1     <           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            =           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            >           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    28480 	   db_qcacac    DATABASE     �   CREATE DATABASE db_qcacac WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Philippines.1252';
    DROP DATABASE db_qcacac;
                postgres    false            �            1259    28482 	   tbl_adopt    TABLE     T  CREATE TABLE public.tbl_adopt (
    id integer DEFAULT nextval('public.tbl_adopt_id_seq'::regclass) NOT NULL,
    series_no character varying(20),
    adopter_id integer,
    pet_id integer,
    docu_id integer,
    payment_id integer,
    schedule_id integer,
    status character varying(50),
    date_created timestamp with time zone
);
    DROP TABLE public.tbl_adopt;
       public         heap    postgres    false            �           2606    28560    tbl_adopt tbl_adopt_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.tbl_adopt
    ADD CONSTRAINT tbl_adopt_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.tbl_adopt DROP CONSTRAINT tbl_adopt_pkey;
       public            postgres    false    215            �           2606    28587 #   tbl_adopt tbl_adopt_adopter_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tbl_adopt
    ADD CONSTRAINT tbl_adopt_adopter_id_fkey FOREIGN KEY (adopter_id) REFERENCES public.tbl_adopter(id);
 M   ALTER TABLE ONLY public.tbl_adopt DROP CONSTRAINT tbl_adopt_adopter_id_fkey;
       public          postgres    false    215            �           2606    28592     tbl_adopt tbl_adopt_docu_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tbl_adopt
    ADD CONSTRAINT tbl_adopt_docu_id_fkey FOREIGN KEY (docu_id) REFERENCES public.tbl_adopter_documents(id);
 J   ALTER TABLE ONLY public.tbl_adopt DROP CONSTRAINT tbl_adopt_docu_id_fkey;
       public          postgres    false    215            �           2606    28597 #   tbl_adopt tbl_adopt_payment_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tbl_adopt
    ADD CONSTRAINT tbl_adopt_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES public.tbl_adopter_payment(id);
 M   ALTER TABLE ONLY public.tbl_adopt DROP CONSTRAINT tbl_adopt_payment_id_fkey;
       public          postgres    false    215            �           2606    28602    tbl_adopt tbl_adopt_pet_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tbl_adopt
    ADD CONSTRAINT tbl_adopt_pet_id_fkey FOREIGN KEY (pet_id) REFERENCES public.tbl_pets(id);
 I   ALTER TABLE ONLY public.tbl_adopt DROP CONSTRAINT tbl_adopt_pet_id_fkey;
       public          postgres    false    215            �           2606    28607 $   tbl_adopt tbl_adopt_schedule_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tbl_adopt
    ADD CONSTRAINT tbl_adopt_schedule_id_fkey FOREIGN KEY (schedule_id) REFERENCES public.tbl_adopter_schedule(id);
 N   ALTER TABLE ONLY public.tbl_adopt DROP CONSTRAINT tbl_adopt_schedule_id_fkey;
       public          postgres    false    215           