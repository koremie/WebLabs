create schema if not exists terrarium_animals ;
use terrarium_animals;

drop table if exists animal;
create table if not exists animal(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    spesies varchar(50) NOT NULL,
    size varchar(20) NOT NULL,
    lifespan varchar(20) NOT NULL,
    dangerLevel varchar(20) NOT NULL,
	diet varchar(50) NOT NULL,
	daysNotFed int NOT NULL,
    CONSTRAINT service_staff_pk PRIMARY KEY (id)
);

-------- Default animals --------

INSERT INTO animal(name, spesies, size, lifespan, dangerLevel, diet, daysNotFed) values
    ('Spook', 'Dendrobatidae', '5cm', '13y', 'Moderate', 'Insects', 2),
    ('Nem', 'Chacoan horned frog', '10cm', '7y', 'Moderate', 'Insects and small mammals', 3),
    ('Fighty', 'European mantis', '9cm', '12y', 'Moderate', 'Insects', 7),
    ('Andie', 'Lepidodactylus lugubris', '9cm', '8y', 'Low', 'Insects', 1),
    ('Slay', 'Lepidodactylus lugubris', '18cm', '13y', 'Extreme', 'Insects', 2);