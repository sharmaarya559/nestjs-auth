import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User, UserDocument } from 'src/schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModal: Model<UserDocument>,
  ) {}

  async updateHashedRefreshToken(
    user_id: string,
    hashed_refresh_token: string,
  ) {
    try {
      await this.userModal.findByIdAndUpdate(user_id, {
        $set: { hashed_refresh_token },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async signUp(body: CreateUserDto) {
    try {
      const findUser = await this.userModal.findOne({
        email: body?.email,
      });
      if (findUser) {
        return {
          success: false,
          message: 'Email exists.',
        };
      }
      const user = await new this.userModal(body).save();
      return {
        success: true,
        user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async findUser(email: string) {
    try {
      return await this.userModal.findOne({ email });
    } catch (error) {
      return null;
    }
  }

  async findUserbyId(user_id: string) {
    try {
      return await this.userModal.findById(user_id);
    } catch (error) {
      return null;
    }
  }

  async getProfile(user_id: string) {
    try {
      console.log(user_id);
      const user = await this.userModal.findById(user_id);
      if (!user) {
        return { success: false, message: 'User not found.' };
      }
      return {
        success: true,
        user,
      };
    } catch (error) {
      return { success: false, message: error?.message };
    }
  }

  async save(data) {
    try {
      const user = await new this.userModal(data).save();
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
