<template>
    <div class="container min-vh-100 d-flex align-items-center  justify-content-center">
        <div class="row d-flex align-items-center justify-content-center h-100 w-100">
            <div class="col-12 col-md-6 col-lg-5 col-xl-4">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title text-center mb-4">{{ t('login.title') }}</h2>
                        <form
                            class="row g-3"
                            @submit.stop.prevent="submit"
                        >
                            <div class="col-12">
                                <Field
                                    :label="t('field.title.name')"
                                    type="email"
                                    classes=""
                                    id="email"
                                    :required="true"
                                    v-model="form.name"
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
                            <div class="col-12 mb-4">
                                <button type="submit" class="btn btn-primary w-100 mt-2 ">
                                    {{ t('login.signIn')     }}
                                </button>
                            </div>
<!--                            <p class="text-end">-->
<!--                                <RouterLink-->
<!--                                    :to="{name: 'Register'}"-->
<!--                                >-->
<!--                                    {{ t('register.title') }}-->
<!--                                </RouterLink>-->
<!--                            </p>-->
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {RouterLink, useRouter} from "vue-router";
import {useUserSession} from "@/store/userSession";
import {onMounted, ref, Ref} from "vue";
import Field from "@/components/Form/Field/Field.vue";
import {useI18n} from "vue-i18n";
import {useNotifications} from "@/store/notifications";

const router = useRouter()
const { t } = useI18n()
const notifications = useNotifications()
const userSession = useUserSession();

const form: Ref = ref({
    name: '',
    password: ''
})
const submit = async () => {
    const userSession = useUserSession();

    const fields = {
        email: form.value.name,
        password: form.value.password,
    }

    const response = await ApiSystemServices.login({}, fields)

    if (response.status.toString().startsWith('20')) {
        userSession.setToken(response.data.token);
        userSession.setUser(response.data.user);

        await router.push({ name: 'Dashboard' });
    }else{
        notifications.error(t('notification.error'), response.data.message || t('login.notification.error.passOrLogin'));
    }
}


onMounted(()=> {
    if (userSession.isLoggedIn) {
        router.push({ name: 'Dashboard' });
    }
})
</script>

<style lang="scss" scoped>

</style>