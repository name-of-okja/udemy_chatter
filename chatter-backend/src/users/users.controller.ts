import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { TokenPayload } from 'src/auth/token-payload.interface';
import { UsersService } from './users.service';
import { USERS_IMAGE_FILE_EXTENSION } from './users.constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('image')
  async uploadProfilePicture(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: USERS_IMAGE_FILE_EXTENSION }),
        ],
      }),
    )
    file: Express.Multer.File,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.usersService.uploadImage(file.buffer, user._id);
  }
}
