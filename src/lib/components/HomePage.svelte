<script>
    // your script goes here
    import { page } from '$app/stores';
    // console.log($page.data)
</script>
<div class="home-page">
    <div class=" text-center">Welcome Back {$page.data.user.name}</div>
</div>