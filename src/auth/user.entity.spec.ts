import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

describe('User entity', () => {
    let user: User;
    
    beforeEach(async () => {
        user = new User();
        user.password = 'testPassword';
        user.salt = '$2a$10$LJhlcy.4/wuiBp/g5HN4IO';
        bcrypt.hash = jest.fn();    
    });

    describe('validatePassword', () => {
        it ('returns true as password is valid', async () => {
            bcrypt.hash.mockReturnValue('testPassword');
            expect(bcrypt.hash).not.toHaveBeenCalled();
            const result = await user.validatePassword('123456');
            // expect(bcrypt.hash).toHaveBeenCalledWith('123456', '$2a$10$LJhlcy.4/wuiBp/g5HN4IO');
            // expect(result).toEqual(true);
        });
       
        it ('returns true as password is invalid', async () => {
            bcrypt.hash.mockReturnValue('wrongPassword');
            expect(bcrypt.hash).not.toHaveBeenCalled();
            const result = await user.validatePassword('wrongPassword');
            // expect(bcrypt.hash).toHaveBeenCalledWith('wrongPassword', '$2a$10$LJhlcy.4/wuiBp/g5HN4IO');
            // expect(result).toEqual(false);
        });
    });
});