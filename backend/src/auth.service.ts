import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private users = []; // Demo amaçlý, gerçek projede DB kullanýn

  constructor(private jwtService: JwtService) {}

  async register(data: { email: string; password: string; name: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      password: hashedPassword,
    };
    this.users.push(user);

    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }

  async login(data: { email: string; password: string }) {
    const user = this.users.find((u) => u.email === data.email);
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Geçersiz email veya þifre');
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }

  async getMe(authHeader: string) {
    if (!authHeader) throw new UnauthorizedException();
    const token = authHeader.replace('Bearer ', '');
    try {
      const decoded = this.jwtService.verify(token);
      const user = this.users.find((u) => u.id === decoded.id);
      if (!user) throw new UnauthorizedException();
      return { id: user.id, email: user.email, name: user.name };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
