DROP INDEX `referenceId_idx`;--> statement-breakpoint
CREATE INDEX `referenceId_idx` ON `recommendedModule` (`referenceId`);