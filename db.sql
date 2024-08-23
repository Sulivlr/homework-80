create schema inventory collate utf8mb4_general_ci;
use inventory;

create table categories
(
    id          int auto_increment
        primary key,
    title       varchar(255) not null,
    description text         null
);

create table location
(
    id          int auto_increment
        primary key,
    title       varchar(255) not null,
    description text         null
);

create table items
(
    id          int auto_increment
        primary key,
    category_id int                                not null,
    location_id int                                not null,
    title       varchar(255)                       not null,
    description text                               null,
    image       varchar(255)                       null,
    created_at  datetime default CURRENT_TIMESTAMP null,
    constraint items_categories_id_fk
        foreign key (category_id) references categories (id),
    constraint items_location_id_fk
        foreign key (location_id) references location (id)
);

insert into categories (id, title, description)
values  (1, 'pcEquipment', 'Any personal computer equipments'),
        (2, 'SSD', 'The most selling SSD product today'),
        (3, 'CPU', 'Sales leader'),
        (4, 'GPU', 'The most powerful GPU on the market');

        insert into location (id, title, description)
        values  (1, 'Ahunbayeva-7-April 18-143', 'From lake side'),
                (2, 'Tsum 5th floor', 'Our second place');

        insert into items (id, category_id, location_id, title, description, image, created_at)
        values  (1, 3, 2, 'Intel Core i9-14900K', 'The most high perfomance CPU', '1.jpg', '2024-08-23 15:16:35'),
                (2, 2, 1, 'RTX 4090 OC', 'The most high perfomance GPU', '2.jpg', '2024-08-23 15:21:59'),
                (3, 1, 1, 'KINGSTON HYPERX FURY BEAST SSD', 'Most high perfomance and expensive product', '3.jpg', '2024-08-23 15:21:59');

