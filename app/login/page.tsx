'use client'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
})

const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
})

type LoginForm = z.infer<typeof loginSchema>
type RegisterForm = z.infer<typeof registerSchema>

function AnimatedHero() {
  const titles = useMemo(() => ['Saúde', 'Performance', 'Emagrecimento'], [])
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setIdx(n => (n === titles.length - 1 ? 0 : n + 1)), 2200)
    return () => clearTimeout(t)
  }, [idx, titles])

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-8 pointer-events-none">
      <h1 className="text-4xl md:text-5xl font-bold text-center tracking-tight drop-shadow-lg">
        Dr. Mateus Louis é
      </h1>
      <div className="relative w-full flex items-center justify-center mt-2" style={{ height: 72, overflow: 'hidden' }}>
        {titles.map((title, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl md:text-5xl font-extrabold drop-shadow-lg whitespace-nowrap"
            style={{ color: '#C9A84C' }}
            initial={{ opacity: 0, y: 80 }}
            transition={{ type: 'spring', stiffness: 70, damping: 20 }}
            animate={idx === i ? { y: 0, opacity: 1 } : { y: idx > i ? -80 : 80, opacity: 0 }}
          >
            {title}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

function InputField({ label, error, leftIcon, ...props }: {
  label: string; error?: string; leftIcon?: React.ReactNode;
  [key: string]: unknown
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{leftIcon}</div>
        )}
        <input
          className={`w-full border border-gray-200 rounded-lg py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition-all ${leftIcon ? 'pl-9 pr-3' : 'px-3'}`}
          {...props as React.InputHTMLAttributes<HTMLInputElement>}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const loginForm = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })
  const registerForm = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) })

  const onLogin = async (data: LoginForm) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: data.email, password: data.password })
      if (error) throw error
      showToast('Bem-vindo!', 'success')
      setTimeout(() => router.push('/evolucao'), 800)
    } catch (err: unknown) {
      showToast((err as { message?: string })?.message ?? 'Credenciais inválidas', 'error')
    }
  }

  const onRegister = async (data: RegisterForm) => {
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { data: { name: data.name } },
      })
      if (error) throw error
      if (signUpData.session) {
        showToast('Conta criada com sucesso!', 'success')
        setTimeout(() => router.push('/evolucao'), 800)
      } else {
        showToast('Verifique seu e-mail para confirmar o cadastro.', 'success')
        setMode('login')
      }
    } catch (err: unknown) {
      showToast((err as { message?: string })?.message ?? 'Erro ao criar conta', 'error')
    }
  }

  return (
    <div className="min-h-screen flex bg-black">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-500'}`}>
          {toast.msg}
        </div>
      )}

      {/* Left panel */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden bg-black items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B201C] to-black opacity-80" />
        <AnimatedHero />
      </div>

      {/* Right panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <img src="/logo.png" alt="Portal do Paciente" className="h-[105px] w-[105px] object-contain mb-3" />
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            {(['login', 'register'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setMode(tab)}
                className={`pb-2.5 px-1 mr-6 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  mode === tab ? 'border-[#C9A84C] text-[#C9A84C]' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'login' ? 'Entrar' : 'Criar Conta'}
              </button>
            ))}
          </div>

          {mode === 'login' && (
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
              <InputField label="E-mail" type="email" placeholder="seu@email.com" leftIcon={<Mail size={16} />} error={loginForm.formState.errors.email?.message} {...loginForm.register('email')} />
              <InputField label="Senha" type="password" placeholder="••••••••" leftIcon={<Lock size={16} />} error={loginForm.formState.errors.password?.message} {...loginForm.register('password')} />
              <div className="flex justify-end">
                <button type="button" className="text-xs text-[#C9A84C] hover:underline">Esqueceu a senha?</button>
              </div>
              <button
                type="submit"
                disabled={loginForm.formState.isSubmitting}
                className="w-full py-2.5 rounded-lg text-white font-semibold text-sm disabled:opacity-60 transition-all"
                style={{ background: 'linear-gradient(135deg, #0B201C 0%, #3C5955 100%)' }}
              >
                {loginForm.formState.isSubmitting ? 'Entrando...' : 'Fazer Login'}
              </button>
              <p className="text-center text-xs text-gray-500">
                Não tem conta?{' '}
                <button type="button" onClick={() => setMode('register')} className="text-[#C9A84C] hover:underline font-medium">Crie já!</button>
              </p>
            </form>
          )}

          {mode === 'register' && (
            <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
              <InputField label="Nome completo" type="text" placeholder="Seu nome" leftIcon={<User size={16} />} error={registerForm.formState.errors.name?.message} {...registerForm.register('name')} />
              <InputField label="E-mail" type="email" placeholder="seu@email.com" leftIcon={<Mail size={16} />} error={registerForm.formState.errors.email?.message} {...registerForm.register('email')} />
              <InputField label="Senha" type="password" placeholder="••••••••" leftIcon={<Lock size={16} />} error={registerForm.formState.errors.password?.message} {...registerForm.register('password')} />
              <InputField label="Confirmar senha" type="password" placeholder="••••••••" leftIcon={<Lock size={16} />} error={registerForm.formState.errors.confirmPassword?.message} {...registerForm.register('confirmPassword')} />
              <button
                type="submit"
                disabled={registerForm.formState.isSubmitting}
                className="w-full py-2.5 rounded-lg text-white font-semibold text-sm disabled:opacity-60 transition-all"
                style={{ background: 'linear-gradient(135deg, #0B201C 0%, #3C5955 100%)' }}
              >
                {registerForm.formState.isSubmitting ? 'Criando...' : 'Criar Conta'}
              </button>
              <p className="text-center text-xs text-gray-500">
                Já tem conta?{' '}
                <button type="button" onClick={() => setMode('login')} className="text-[#C9A84C] hover:underline font-medium">Entrar</button>
              </p>
            </form>
          )}

          <p className="mt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Portal do Paciente · Dr. Mateus Louis
          </p>
        </div>
      </div>
    </div>
  )
}
