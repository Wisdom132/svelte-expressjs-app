<script>
  import { onMount } from "svelte";
  import PostForm from "./PostForm.svelte";

  const baseUrl = "http://localhost:4000/blog";
  let posts = [];
  let editPost = {
    title: "",
    category: "",
    author: "",
    content: "",
    _id: null
  };

  onMount(async () => {
    let res = await fetch(baseUrl);
    posts = await res.json();
    console.log(posts);
  });

  let addpost = ({ detail: post }) => {
    if (posts.find(p => p._id === post._id)) {
      const index = posts.findIndex(p => p._id === post._id);
      let postUpdated = posts;
      console.log(postUpdated);
      postUpdated.splice(index, 1, post);
      posts = postUpdated;
    } else {
      posts = [post, ...posts];
    }
  };

  let deletePost = async id => {
    if (confirm("Are You Sure?")) {
      let res = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE"
      });
      posts = posts.filter(p => p._id !== id);
    } else {
      alert("Your Post is safe!!");
    }
  };

  let editPostDetails = async post => {
    editPost = post;
  };
</script>

<PostForm on:postCreated={addpost} {editPost} />
<section class="mt-5">
  <div class="container">
    <div class="row">
      {#if posts.length === 0}
        <p>Loading</p>
      {:else}
        {#each posts as post}
          <div class="col-md-4 mb-3">
            <div class="card">
              <div class="card-header">{post.category}</div>
              <div class="card-body">
                <h5 class="card-title">{post.title}</h5>
                <p class="card-text">{post.content}</p>
                <button class="btn btn-info" on:click={editPostDetails(post)}>
                  Edit
                </button>
                <button class="btn btn-danger" on:click={deletePost(post._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</section>
