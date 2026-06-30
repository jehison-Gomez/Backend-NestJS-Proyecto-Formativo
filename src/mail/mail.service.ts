import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: this.config.get<string>('MAIL_USER'),
        pass: this.config.get<string>('MAIL_PASS'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendPasswordReset(correo: string, codigo: string, nombre: string): Promise<void> {
    const from = this.config.get<string>('MAIL_FROM') ?? 'GestMat SENA <noreply@sena.edu.co>';

    const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 0;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#39A900;padding:32px 40px;text-align:center;">
            <div style="font-size:13px;color:#d1fae5;font-weight:600;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">Sistema de Gestión de Materiales</div>
            <div style="font-size:28px;color:#ffffff;font-weight:800;letter-spacing:-0.5px;">GestMat · SENA</div>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            <p style="margin:0 0 8px;font-size:18px;font-weight:700;color:#111827;">Hola, ${nombre}</p>
            <p style="margin:0 0 28px;font-size:14px;color:#6b7280;line-height:1.6;">
              Recibimos una solicitud para restablecer la contraseña de tu cuenta en GestMat.
              Usa el código de verificación a continuación. <strong>Expira en 15 minutos.</strong>
            </p>
            <!-- Code box -->
            <div style="background:#f0fdf4;border:2px dashed #86efac;border-radius:10px;padding:24px;text-align:center;margin-bottom:28px;">
              <div style="font-size:11px;color:#16a34a;font-weight:600;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Código de verificación</div>
              <div style="font-size:42px;font-weight:800;letter-spacing:12px;color:#166534;font-family:'Courier New',monospace;">${codigo}</div>
            </div>
            <p style="margin:0 0 8px;font-size:13px;color:#9ca3af;line-height:1.5;">
              Si no solicitaste este cambio, ignora este correo. Tu contraseña no será modificada.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
              SENA · Centro de Gestión y Desarrollo Sostenible Surcolombiano · Sede Yamboro<br>
              Este es un correo automático, por favor no respondas a este mensaje.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    try {
      await this.transporter.sendMail({
        from,
        to: correo,
        subject: `${codigo} — Código de recuperación GestMat`,
        html,
      });
      this.logger.log(`Email de recuperación enviado a ${correo}`);
    } catch (error) {
      this.logger.error(`Error enviando email a ${correo}: ${error.message}`);
      throw error;
    }
  }
}
