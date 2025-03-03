import { PartialType } from '@nestjs/mapped-types';
import { CreateChutpagluDto } from './create-chutpaglu.dto';

export class UpdateChutpagluDto extends PartialType(CreateChutpagluDto) {}
