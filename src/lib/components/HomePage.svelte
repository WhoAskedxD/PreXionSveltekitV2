<script>
    // your script goes here
    import { page } from '$app/stores';
    console.log($page.data)
</script>
<div class="h-full w-full">
    <div class=" text-center">Welcome Back {$page.data.user.name}</div>
    
</div>