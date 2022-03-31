PGDMP      9                     z            postgres    14.2 (Debian 14.2-1.pgdg110+1)    14.2 #               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    13757    postgres    DATABASE     \   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';
    DROP DATABASE postgres;
                postgres    false                       0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3352            �            1259    16438    images    TABLE     �   CREATE TABLE public.images (
    img_id integer NOT NULL,
    img_name character varying(255) NOT NULL,
    img bytea,
    post_id integer
);
    DROP TABLE public.images;
       public         heap    postgres    false            �            1259    16437    images_img_id_seq    SEQUENCE     �   CREATE SEQUENCE public.images_img_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.images_img_id_seq;
       public          postgres    false    216                       0    0    images_img_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.images_img_id_seq OWNED BY public.images.img_id;
          public          postgres    false    215            �            1259    16406 	   inquiries    TABLE       CREATE TABLE public.inquiries (
    inquiry_id integer NOT NULL,
    body character varying(1000),
    email character varying(255) NOT NULL,
    phone character varying(255),
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    viewed boolean DEFAULT false NOT NULL
);
    DROP TABLE public.inquiries;
       public         heap    postgres    false            �            1259    16405    inquiries_inquiry_id_seq    SEQUENCE     �   CREATE SEQUENCE public.inquiries_inquiry_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.inquiries_inquiry_id_seq;
       public          postgres    false    214                       0    0    inquiries_inquiry_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.inquiries_inquiry_id_seq OWNED BY public.inquiries.inquiry_id;
          public          postgres    false    213            �            1259    16385    posts    TABLE     �   CREATE TABLE public.posts (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    body character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.posts;
       public         heap    postgres    false            �            1259    16384    posts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.posts_id_seq;
       public          postgres    false    210                       0    0    posts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;
          public          postgres    false    209            �            1259    16394    users    TABLE     \  CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(55),
    pass_hash character varying(255),
    created_at timestamp without time zone DEFAULT now(),
    token character varying,
    instagram_pass character varying,
    instagram_user character varying,
    email character varying,
    is_admin boolean
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16393    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    212                       0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    211            t           2604    16441    images img_id    DEFAULT     n   ALTER TABLE ONLY public.images ALTER COLUMN img_id SET DEFAULT nextval('public.images_img_id_seq'::regclass);
 <   ALTER TABLE public.images ALTER COLUMN img_id DROP DEFAULT;
       public          postgres    false    215    216    216            q           2604    16409    inquiries inquiry_id    DEFAULT     |   ALTER TABLE ONLY public.inquiries ALTER COLUMN inquiry_id SET DEFAULT nextval('public.inquiries_inquiry_id_seq'::regclass);
 C   ALTER TABLE public.inquiries ALTER COLUMN inquiry_id DROP DEFAULT;
       public          postgres    false    214    213    214            n           2604    16388    posts id    DEFAULT     d   ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);
 7   ALTER TABLE public.posts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            o           2604    16397    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    211    212    212                      0    16438    images 
   TABLE DATA           @   COPY public.images (img_id, img_name, img, post_id) FROM stdin;
    public          postgres    false    216   �&                 0    16406 	   inquiries 
   TABLE DATA           n   COPY public.inquiries (inquiry_id, body, email, phone, first_name, last_name, created_at, viewed) FROM stdin;
    public          postgres    false    214   �&                 0    16385    posts 
   TABLE DATA           H   COPY public.posts (id, title, body, created_at, updated_at) FROM stdin;
    public          postgres    false    210   �(                 0    16394    users 
   TABLE DATA           �   COPY public.users (user_id, username, pass_hash, created_at, token, instagram_pass, instagram_user, email, is_admin) FROM stdin;
    public          postgres    false    212   �,                  0    0    images_img_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.images_img_id_seq', 1, false);
          public          postgres    false    215                       0    0    inquiries_inquiry_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.inquiries_inquiry_id_seq', 11, true);
          public          postgres    false    213                        0    0    posts_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.posts_id_seq', 44, true);
          public          postgres    false    209            !           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);
          public          postgres    false    211            ~           2606    16445    images images_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (img_id);
 <   ALTER TABLE ONLY public.images DROP CONSTRAINT images_pkey;
       public            postgres    false    216            |           2606    16414    inquiries inquiries_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.inquiries
    ADD CONSTRAINT inquiries_pkey PRIMARY KEY (inquiry_id);
 B   ALTER TABLE ONLY public.inquiries DROP CONSTRAINT inquiries_pkey;
       public            postgres    false    214            v           2606    16392    posts posts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pkey;
       public            postgres    false    210            x           2606    16404    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    212            z           2606    16400    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    212                       2606    16446    images images_post_id_fkey    FK CONSTRAINT     y   ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);
 D   ALTER TABLE ONLY public.images DROP CONSTRAINT images_post_id_fkey;
       public          postgres    false    3190    210    216                  x^����� � �         �  x^���N�0�ϳO�>�F;�fsZ��C�=p�"g���nx�K��b���`Z����(��L�:�pRh{�֑5y���gl���r6�F�֐�~�T�SGsi�V�si��;\�&�M0��j�|�}��?J	7Dt<��mK�@��32��U������^���Z���K��G(����:��}z8�Q(9��Pb(]��"�-���.�|��2�r�]�Y/���D����\go������4�jx�[�L�,�){Ag���RZ��嵁�T�P�U�����%��d�kJ��q���bdSd��9 3�)�+*Y�u�yE����؄������_�ж�ۧq\�z�R��Ns��1,�7�6���!3&��.��d&�������T�i0�b�2��!k��C�wZ-h��N��x�X�z         �  x^�V�nE]w}Eg�[���^�B� ��a3�ۙQ�d�cc�R�& �$(be!�X��E�cJ���ݶqu�ț4�3}�}�{�E�zy�^���e[\����E�N��Z�Dr)׸Z���ʣ�\U�A51Y�9�ب�r�,�^ԓ�\�N�9�Z�qeږ��$�/�W���-��!�T���Y3ٙ4��[�uS^�۶^�+.��ք�f$�Ə^
�L ���A�^�S^���u���K����Z:��>����T�*����WS!xЕ2�ðA�S�	~.���$w���0���bҬϷ���+�Ё�B��
eg������֋z������6b�bBf"D��k��6�!2I"�Z��'���pM	J��_!C�0�3�#i��-G���IpN�s�`T�v��r+�\�	��h+-��\�����\k�:I!&0�NH�@+Cj���+M�I
1���[��:���rD�x)=�G
h�� a2�0ٗ�%4yю��yA��(�vX�!Ĩ�C{i쬋��F愈�GWY���M��b2�0��T*�pdc�ro��W�S.��b�<�Vk�Tg�d�1�����vC�I
1���n��Keks������Z3o��ʋ�*Y������9��˖D�s�^ґ�G &u"cn����^�?2�U @��'�1i���Wl�|�g�A�6�*WI�x"b�hS,o�6gq^ڊV��ɚ�s�b�-5��8���(�M�!���E�/�mN����HH+�t��.�c�b ���%�zoݥ���1��0��cx4�bx��?�p/����8��b�^x�d?�o�>������i��R�mB�hT�R���yWw?�+܏�A�H�~G�a���|�>�7C�w��U\����ٽFA�$"㹨�C�
��@�>�U~�'�y�;�_��W�G_��EW���σ;�J����c�z��M�����]�Y)�>�c� :k��         �   x^5��B@  ������������b+Ÿh2���"}}ӡ���"�ȸ���8�R��P;MmN����H�CZaW����gf���Øݮ�@ 1V��`���&�&D� �0���>�]�dxӉ��2�g\�V���Œ�a4�L�|nP2�� 4��,K��B�$��92H     