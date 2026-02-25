'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in a real app you should validate with zod
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect(`/login?message=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect(`/signup?message=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect(`/login?message=${encodeURIComponent('회원가입이 완료되었습니다. 로그인해주세요.')}`)
}

export async function resetPassword(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password`,
    })

    if (error) {
        redirect(`/forgot-password?message=${encodeURIComponent(error.message)}`)
    }

    redirect(`/forgot-password?message=${encodeURIComponent('비밀번호 재설정 링크를 이메일로 보내드렸습니다. 메일함을 확인해주세요.')}`)
}

export async function updatePassword(formData: FormData) {
    const supabase = await createClient()
    const password = formData.get('password') as string

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
        redirect(`/reset-password?message=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect(`/login?message=${encodeURIComponent('비밀번호가 변경되었습니다. 새 비밀번호로 로그인해주세요.')}`)
}
