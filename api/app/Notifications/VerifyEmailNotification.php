<?php

namespace App\Notifications;

use App\Models\EmailVerificationToken;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmailNotification extends Notification
{
    use Queueable;

    public $token;

    public function __construct(string $token)
    {
        $this->token = $token;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $frontendUrl = config('app.frontend_url', config('app.url'));
        $verificationUrl = $frontendUrl . '/verify-email?token=' . $this->token;

        return (new MailMessage)
            ->subject('Verify Your Email Address')
            ->greeting('Hello!')
            ->line('Please verify your email address by clicking the button below.')
            ->action('Verify Email', $verificationUrl)
            ->line('This verification link expires in 60 minutes.')
            ->line('If you did not create this account, no further action is required.')
            ->salutation('Best regards,');
    }
}
