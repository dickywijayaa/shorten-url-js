CREATE TABLE shorten (
	id int primary key auto_increment,
	url varchar(150) not null,
	shortcode varchar(7) not null,
	start_date timestamp default CURRENT_TIMESTAMP,
    last_seen_date timestamp null,
    redirect_count int
)