"use client";

import { Button, Input } from "@/shared";
import { useRegisterForm } from "../model/hooks/use-register-form";

export const RegisterForm = () => {
  const { form, onSubmit, isSubmitting } = useRegisterForm()

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Имя
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Ваше имя"
          // {...register("name")}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          // {...register("email")}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Пароль
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          // {...register("password")}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Подтвердите пароль
        </label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          // {...register("confirmPassword")}
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
      </Button>
    </form>
  );
};