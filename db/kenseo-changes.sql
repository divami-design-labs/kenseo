INSERT INTO  `kenseo`.`organizations` (`org_name` , `description`) VALUES ('Divami', NULL);

INSERT INTO `preferences` (`name`, `code`, `value`, `link_ids`) VALUES
('ArtefactType', 'IxD', 'I', '1'),
('ArtefactType', 'UID', 'U', '2'),
('ArtefactType', 'Information Architecture', 'IA', '3'),
('ArtefactType', 'Persona', 'P', '4'),
('VersionState', 'Critical', 'C', NULL),
('VersionState', 'Normal', 'N', NULL),
('VersionState', 'Approved', 'A', NULL),
('AccessType', 'Read', 'R', NULL),
('AccessType', 'Edit', 'R', NULL),
('AccessType', 'Share', 'S', NULL),
('AccessType', 'All', 'X', NULL),
('CommentType', 'IxD', 'I', NULL),
('CommentType', 'UID', 'U', NULL),
('CommentType', 'Typo', 'T', NULL),
('CommentType', 'Persona', 'P', NULL),
('CommentSeverity', 'High', 'R', NULL),
('CommentSeverity', 'Medium', 'B', NULL),
('CommentSeverity', 'Low', 'G', NULL);

INSERT INTO `tags` (`tag_id`, `tag_name`, `org_id`, `created_date`) VALUES
(1, '@IxD', 1, '2016-01-11 15:33:08'),
(2, '@UID', 1, '2016-01-11 15:33:08'),
(3, '@Information Architecture', 1, '2016-01-11 15:34:17'),
(4, '@Persona', 1, '2016-01-11 15:34:17');
