const postBtn = document.getElementById('post-btn');
const postText = document.getElementById('post-text');
const postImage = document.getElementById('post-image');
const postsFeed = document.getElementById('posts-feed');

function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
}

postBtn.addEventListener('click', () => {
    const text = postText.value.trim();
    const file = postImage.files[0];

    if (!text && !file) {
        alert("Please write something or select an image!");
        return;
    }

    const postDate = new Date();

    // --- Create Post Card ---
    const postCard = document.createElement('div');
    postCard.classList.add('post-card');

    // --- Post Header ---
    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');

    const avatar = document.createElement('div');
    avatar.classList.add('avatar');

    const userInfo = document.createElement('div');
    userInfo.classList.add('user-info');

    const username = document.createElement('h3');
    username.textContent = "John Doe";

    const timestamp = document.createElement('p');
    timestamp.textContent = timeSince(postDate);
    setInterval(() => {
        timestamp.textContent = timeSince(postDate);
    }, 60000);

    userInfo.appendChild(username);
    userInfo.appendChild(timestamp);
    postHeader.appendChild(avatar);
    postHeader.appendChild(userInfo);

    // --- Post Body ---
    const postBody = document.createElement('div');
    postBody.classList.add('post-body');

    if (text) {
        const p = document.createElement('p');
        p.textContent = text;
        postBody.appendChild(p);
    }

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            postBody.appendChild(img);
        };
        reader.readAsDataURL(file);
    }

    // --- Post Footer ---
    const postFooter = document.createElement('div');
    postFooter.classList.add('post-footer');

    // Like Button
    const likeBtn = document.createElement('button');
    let liked = false;
    let likeCount = 0;
    likeBtn.innerHTML = `<i class="fas fa-heart"></i> Like`;
    likeBtn.addEventListener('click', () => {
        liked = !liked;
        likeCount = liked ? likeCount + 1 : likeCount - 1;
        likeBtn.innerHTML = `<i class="fas fa-heart" style="color:${liked ? '#4da6ff' : 'white'};"></i> Like${likeCount > 0 ? ' ('+likeCount+')' : ''}`;
    });

    // Comment Button
    const commentBtn = document.createElement('button');
    commentBtn.innerHTML = `<i class="fas fa-comment"></i> Comments`;

    // Share Button
    const shareBtn = document.createElement('button');
    shareBtn.innerHTML = `<i class="fas fa-share"></i> Share`;

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = `<i class="fas fa-trash"></i> Delete`;
    deleteBtn.style.color = '#ff4d4d';
    deleteBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to delete this post?")) {
            postCard.remove();
        }
    });

    postFooter.appendChild(likeBtn);
    postFooter.appendChild(commentBtn);
    postFooter.appendChild(shareBtn);
    postFooter.appendChild(deleteBtn);

    // --- Comment Section ---
    const commentSection = document.createElement('div');
    commentSection.classList.add('comment-section');
    commentSection.style.display = 'none'; // hidden by default
    commentSection.style.marginTop = '0.5rem';

    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Write a comment...';
    commentInput.style.width = '100%';
    commentInput.style.padding = '0.5rem';
    commentInput.style.borderRadius = '8px';
    commentInput.style.border = 'none';
    commentInput.style.backgroundColor = '#121212';
    commentInput.style.color = '#f0f0f0';

    const commentList = document.createElement('div');
    commentList.style.marginTop = '0.5rem';

    commentSection.appendChild(commentInput);
    commentSection.appendChild(commentList);

    // Toggle comment section visibility
    commentBtn.addEventListener('click', () => {
        commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
    });

    // Add comments
    commentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && commentInput.value.trim() !== '') {
            const comment = document.createElement('div');
            comment.style.display = 'flex';
            comment.style.justifyContent = 'space-between';
            comment.style.background = '#1e1e1e';
            comment.style.padding = '0.4rem 0.6rem';
            comment.style.borderRadius = '6px';
            comment.style.marginBottom = '0.3rem';

            const commentText = document.createElement('span');
            commentText.textContent = commentInput.value.trim();

            const commentTime = document.createElement('span');
            const commentDate = new Date();
            commentTime.style.fontSize = '0.7rem';
            commentTime.style.color = '#aaa';
            commentTime.textContent = timeSince(commentDate);

            setInterval(() => {
                commentTime.textContent = timeSince(commentDate);
            }, 60000);

            comment.appendChild(commentText);
            comment.appendChild(commentTime);
            commentList.appendChild(comment);
            commentInput.value = '';
        }
    });

    // Share functionality
    shareBtn.addEventListener('click', () => {
        const fakeLink = 'https://mysocial.com/post/' + Math.floor(Math.random() * 10000);
        navigator.clipboard.writeText(fakeLink).then(() => {
            alert('Post link copied: ' + fakeLink);
        });
    });

    // Assemble post card
    postCard.appendChild(postHeader);
    postCard.appendChild(postBody);
    postCard.appendChild(postFooter);
    postCard.appendChild(commentSection);

    postsFeed.prepend(postCard);

    // Reset inputs
    postText.value = '';
    postImage.value = '';
});
