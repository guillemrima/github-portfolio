const REPO = "github-portfolio"
        const USER = "guillemrima"
        const ISSUES_URL = `https://api.github.com/repos/${USER}/${REPO}/issues`
        const PROFILE_URL = "https://api.github.com/users/guillemrima";
        const REPO_URL = `https://api.github.com/users/${USER}/repos`;

        fetch(PROFILE_URL, {
            cache: "force-cache" //PARA FORZAR LA CACHE Y ASI CONSUMIR MENOS RECURSOS A LA HORA DE ENTRAR EN LA PÁGINA
        }).then(
            (response) => {
                const data = response.json().then(
                    (json) => {
                        hydrateDOM(json);
                    }
                );
            }
        )

        fetch(ISSUES_URL).then(res =>{
            res.json().then(data => {
                console.log(data)
                hydrateIssues(data);
            })
        })

        fetch(REPO_URL).then(res =>{
            res.json().then(data =>{
                console.log(data)
                hydrateRepo(data);
            })
        })

        function hydrateRepo(json){
            const repoContainer = document.getElementById("repos");
            json.forEach(repo =>{
                const repoEl = document.createElement("p");
                repoEl.innerHTML = repo.name;
                repoContainer.appendChild(repoEl);  
            })

        }

        function hydrateIssues(json){
            const el = document.getElementById("issues");

            json.forEach(issue => {
                const issueEl = document.createElement("a")
                issueEl.innerHTML = issue.title
                issueEl.href = `blog?issue=${issue.number}`
                el.appendChild(issueEl)
                
            })
        }

        function hydrateDOM(json){
            console.log(json);
            const name = json.name;
            const location = json.location;
            const bio = json.bio;
            const avatar = json.avatar_url;
            const following = json.following;
            const followers = json.followers;

            nameEl.innerHTML = `Hi there! Welcome to my portfolio,<br> I'm ${name}`;
            logoEl.innerHTML = name;
            locationEl.innerHTML = location;
            avatarEl.src = avatar;
            bioEl.innerHTML = bio;
            followingEl.innerHTML = `${following} following`;   
            followersEl.innerHTML = `${followers} followers`;    
        }

        const nameEl = document.getElementById("name");
        const logoEl = document.getElementById("logo");
        const avatarEl = document.getElementById("avatar");
        const bioEl = document.getElementById("bio");
        const locationEl = document.getElementById("location");
        const followersEl = document.getElementById("number__followers");
        const followingEl = document.getElementById("number__following");
