import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // users dizisinin tipini belirledik ki 'never' hatası vermesin
  private users: any[] = [];

  constructor(private jwtService: JwtService) {}

  async register(data: any) {
    const user = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      password: data.password,
    };
    this.users.push(user);
    
    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }

  async login(data: any) {
    const user = this.users.find((u) => u.email === data.email);
    if (!user || user.password !== data.password) {
      throw new UnauthorizedException('Invalid email or password');
    }
    
    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }

  async getMe(authHeader: string) {
    if (!authHeader) throw new UnauthorizedException();
    const token = authHeader.replace('Bearer ', '');
    try {
      const decoded = this.jwtService.verify(token) as any;
      const user = this.users.find((u) => u.id === decoded.id);
      if (!user) throw new UnauthorizedException();
      return { id: user.id, email: user.email, name: user.name };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
