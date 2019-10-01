import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

const mockCredentialsDto = { username: 'TestUserName', password: 'TestPassword' };

describe('UserRepository', () => {
  let userRepository;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserRepository,
      ],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let save;

    beforeEach(() => {
        save = jest.fn();
        userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('successfully signs up the user', async () => {
        save.mockResolvedValue(undefined);
        expect(userRepository.signUp(mockCredentialsDto)).resolves.not.toThrow();
    });


    it('throws a conflict exception as username already exists', async () => {
        save.mockRejectedValue({ code: '23505' });
        expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(ConflictException);
    });

    it('throws unhandled error', async () => {
        save.mockRejectedValue({ code: '123123' });
        expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('validation user password', () => {
    let user;

    beforeEach(() => {
        userRepository.findOne = jest.fn();
        user = new User();
        user.username = 'TestUsername';
        user.validatePassword = jest.fn();     
    });

    it('returns the username as validation is successfull', async () => {
        userRepository.findOne.mockResolvedValue(user);
        user.validatePassword.mockResolvedValue(true);

        const result = await userRepository.validateUserPassword(mockCredentialsDto);
        expect(result).toEqual(user.username);
    });

    it('returns null as user is not found', async () => {
        userRepository.findOne.mockResolvedValue(null);
        const result = await userRepository.validateUserPassword(mockCredentialsDto);
        expect(user.validatePassword).not.toHaveBeenCalled();
        expect(result).toBeNull();
    });

    it('returns null as password is not found', async () => {
        userRepository.findOne.mockResolvedValue(user);
        user.validatePassword.mockResolvedValue(false);
        const result = await userRepository.validateUserPassword(mockCredentialsDto);
        expect(user.validatePassword).toHaveBeenCalled();
        expect(result).toBeNull();
    });
  });


  describe('hashPassword', () => {
 
    it('calls bcrypt.hash to generate a hash', async () => {
        bcrypt.hash = jest.fn().mockResolvedValue('testHash');
        expect(bcrypt.hash).not.toHaveBeenCalled();
        const result = await userRepository.hashPassword('testPassword', '$2a$10$LJhlcy.4/wuiBp/g5HN4IO');
        // expect(bcrypt.hash).toHaveBeenCalledWith('testPassword', '$2a$10$LJhlcy.4/wuiBp/g5HN4IO');
        // expect(bcrypt.hash).toHaveBeenCalled();
        // expect(result).toEqual('testHash');
    });
  });

});
