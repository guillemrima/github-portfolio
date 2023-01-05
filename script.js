const REPO = "github-portfolio"
        const USER = "guillemrima"
        const ISSUES_URL = `https://api.github.com/repos/${USER}/${REPO}/issues`;
        const PROFILE_URL = "https://api.github.com/users/guillemrima";
        const REPO_URL = `https://api.github.com/users/${USER}/repos`;

        fetch(PROFILE_URL, {
            cache: "force-cache" //PARA FORZAR LA CACHE Y ASI CONSUMIR MENOS RECURSOS A LA HORA DE ENTRAR EN LA PÁGINA
        }).then(
            (response) => {
                const data = response.json().then(
                    (json) => {
                        hydrateProfile(json);
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
                hydrateRepo(data);
            })
        })

        function hydrateRepo(json){
            const repoContainer = document.getElementById("repos");
            for (repoJson of json){
            const repoDiv = document.createElement("div");
            const repoImg = document.createElement("img");
            const repoCodeURL = document.createElement("a");
            const repoPagesURL = document.createElement("a");

            repoImg.src= `./img/repos/${repoJson.name}.png`;

            repoCodeURL.innerHTML = "Code";
            repoCodeURL.href = `https://github.com/${USER}/${repoJson.name}`;
            
            
            repoPagesURL.innerHTML = "Pages";
            repoPagesURL.href =`https://${USER}.github.io/${repoJson.name}/`;

            repoDiv.appendChild(repoImg);
            repoDiv.appendChild(repoCodeURL);
            repoDiv.appendChild(repoPagesURL);
            repoContainer.appendChild(repoDiv);


            repoDiv.classList.add("repo");
            repoCodeURL.classList.add("repoCodeURL");
            repoCodeURL.classList.add("repoURL");
            repoPagesURL.classList.add("repoPagesURL");
            repoPagesURL.classList.add("repoURL");

            }

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

        function hydrateProfile(json){
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
