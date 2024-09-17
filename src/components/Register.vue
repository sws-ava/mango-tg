<template>
    <div class="container min-vh-100 d-flex align-items-center justify-content-center">
        <div class="row d-flex align-items-center justify-content-center h-100  w-100">
            <div class="col-12 col-md-6 col-lg-5 col-xl-4">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title text-center mb-4">{{ t('register.title') }}</h2>
                        <form
                            class="row g-3"
                            @submit.stop.prevent="register"
                        >
                            <div class="col-12">
                                <Field
                                    :label="t('field.title.name')"
                                    type="text"
                                    classes=""
                                    id="name"
                                    :required="true"
                                    v-model="form.name"
                                />
                            </div>
                            <div class="col-12">
                                <Field
                                    :label="t('field.title.email')"
                                    type="email"
                                    classes=""
                                    id="email"
                                    :required="true"
                                    v-model="form.email"
                                />
                            </div>
                            <div class="col-12">
                                <Field
                                    :label="t('field.title.password')"
                                    type="password"
                                    classes=""
                                    id="password"
                                    :required="true"
                                    v-model="form.password"
                                />
                            </div>
                            <div class="col-12">
                                <Field
                                    :label="t('field.title.password_confirmation')"
                                    type="password"
                                    classes=""
                                    id="password_confirmation"
                                    :required="true"
                                    v-model="form.password_confirmation"
                                />
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary w-100 mt-2 ">
                                    {{ t('button.register') }}
                                </button>
                            </div>
                            <p class="text-end"><RouterLink :to="{name: 'Main'}">
                                {{ t('button.login') }}
                            </RouterLink></p>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {RouterLink, useRouter} from 'vue-router'
import Field from "@/components/Form/Field/Field.vue";
import {onMounted,ref,Ref} from "vue";
import { useNotifications } from '@/store/notifications'
import { useI18n } from 'vue-i18n'
import {useUserSession} from "@/store/userSession";

const { t } = useI18n()
const userSession = useUserSession();
const notifications = useNotifications()
const router = useRouter()

const form: Ref = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const registerHandler = async () => {
    const userSession = useUserSession();

    const fields = {
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation
    }

    const response = await ApiSystemServices.register({}, fields)
    if (response.status.toString().startsWith('20')) {
        userSession.setToken(response.data.token);
        userSession.setUser(response.data.user);

        await router.push({ name: 'Dashboard' });
    }else{
        notifications.error(t('notification.error'), response.data.message || t('register.notification.error.passOrLogin'));
    }
}

const register = async () =>{
    if(form.value.password !== form.value.password_confirmation){
        notifications.error(t('notification.error'), t('register.notification.passNotConfirm'))
        return
    }
    await registerHandler()
}

onMounted(()=> {
    if (userSession.isLoggedIn) {
        router.push({ name: 'Dashboard' });
    }
})

</script>

<style lang="scss" scoped>

</style>