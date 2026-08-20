My little guide to vibe… err ai assisted coding

* Stop telling the ai its great at what it does, like you are an experienced developer, not its not, at best it is a junior developer with alzheimer and some dementia issues, they works drunk half of the time  
  * A study by openai found that reasoning ai’s would cheat at tests, when the test instructions would imply that the test is to asses the ai knowledge it has, and if it has a certain knowledge it will get deleted, so the ai started faking responses to avoid getting deleted  
  * Same is true for an ai that constantly gets told its amazing at coding, at some point it will actually believe it and take decisions based on that belief that will harm your codebase  
  * However I am not saying that you should not tell it that its not a developer or a engineer with a focus on technology X and Y, because its still true that this has a chance to trigger the right experts inside the model and open up knowledge in certain areas of its brain, which it would otherwise ignore  
  * So instead tell it your are good at coding but you make mistakes at times, so be careful when coding, always verify assumptions and most importantly read the fucking latest docs if you are not sure  
* Linting \+ ai \= superpowers  
  * First make sure to have a strong linting setup, I wrote an article about just that for typescript / next.js / react setups. Then i added a package json script “npm run lint” so that the ai can always use that and not hallucinate its custom eslint command  
  * My lint script always start with a typescript type check, this helps catching typescript errors early, when that is done its runs the eslint command  
  * Linting typescript, react (using the optimizer linting through the react hooks linting package), have prevented countless missed best practices by the ai, linting forces your ai to code well  
  * When you have linting set up, add a sentence to the ai instructions that tells it to always run the lint command when its done coding (at the end of a task), and if linting surfaces problems to fix them.  
* Install playwright MCP (if you work with [next.js](http://next.js) and have the [next.js](http://next.js) MCP set up, then you can access their playwright instance and don’t need to set it up separately)  
  * The good thing about playwright is that it allows the llm to open the local development version in the browser and look things up  
  * This is helpful to just let the llm verify if a button now has the right color now  
  * Its also great to run tests, tell it to code something and then have it login and verify the implementation on its own  
  * Regarding login, i created an env file in which i put a username and password for it to use in dev, the credentials can get rotated on a regular basis if needed  
  * Important after installing playwright, dont forget to tell the ai in its instructions file about the new tool and tell it that it can use the playwright mcp everytime it needs to do a test on its own, tell it also that it is only allowed to access dev and preview but never prod, its not as effective as a real permission setting but so far the ai never tried to bypass my rule  
  * Tell your ai in the instructions that a playwright instance can get locked, if you work like my on several small tickets at once in different terminal windows, then this help two competing agents to not constantly hijack each others playwright session and instead wait for the other agent to finish, also very important, tell the ai to not forget to unlock playwright as soon as its done  
* Some people say you should use plans (or specs) to code with AI, other say you should do it all backwards and write the documentation first, and yet another group writes test first and then codes, but why not all 3?  
  * I have a short chapter in my llm instructions that tells the ai to do exactly that  
  * First create the plan in the folder called plans  
    * Each plan is a markdown file that goes into the plans folder, it contains a description of what we need to  
    * Each document is a markdown file that goes into the docs folder  
    * Then i have a tests folder with again markdown files, in which we describe how to test what we just built  
  * The most important trick with those 3 layers of documents is how you explain it to the llm in its instructions  
    * For the plan  
      * I tell it that plans need several sections, first a section that keeps my input prompt almost untouched, so that it can remember what the initial request was  
        * When you give an ai prompt you will tell it something like we need to fix this because of that, but then the ai writes the plan and all it remembers is what needs to get done but not why, meaning knowledge gets lost  
        * Then when coding is done tell the ai to put all the knowledge from the plan as condensed version into the docs  
        * And it works, the ai will store that we fixed a bug because of performance issues, and next time it writes a new plan it will notice that the docs mentioned that something had to get fixed because of performance and will do it right this time around. Since i do apply this little trick i have seen my agent tell me countless times “hey i did and saw that in the docs so i made sure its done right”, when i see those reports it makes me smile because i finally have an ai that learns from its mistakes instead of continuously repeating them  
      * Then i tell the ai to check out the docs and find any knowledge that might be useful for the current task, based on things we did in the past, this helps a lot with continuity, like ensure the datalayers are always built the same way  
      * Then i tell the ai to write done everything it will do  
      * Then i tell the ai that it should list things we will need to test when done  
      * And finally i tell the ai to list all open questions it has, i also tell it that when in doubt, don’t take a decision yourself, but write down a question in which you explain to me what the dilemma is and how i would do it  
    * For the docs  
      * I tell it that every time we are done with implementing a new feature, that it should store knowledge we gained during the planning and coding phase into the docs  
    * The tests  
      * At the end of each plan i always ask it list tests we need to make after the coding phase, like use playwright and check if this or that works and make sure nothing broke  
      * The tests are markdown files i keep, organized by domain, meaning over time ai will add new things that must get tested  
      * Then later at any time you can ask the ai to hover over the test archive and repeat them all, just to make sure we did not introduce a new bug  
      * I like letting the ai test in dev because  
        * with the playwright mcp installed it can access the local dev version and click itself through the test  
        * It can also use the local mcp to check if the values get mutated in the db as expected  
        * And i can tell it to read the logs of my dev server and act when new warnings or any errors show up  
* I use claude code cli and I wanted to be able to see at what level my context is at any time so i asked claude to write me a small “statusline” script which does that and shows me a few other values, like when do my limits reset  
  * Now that i know at any time how much context i have used up, allows me to decide when to a compaction instead of letting the ai do it itself when it reaches the limit, which often is not the best time to do  
    * So now when i reach 90% i tell the ai about the upcoming compaction first, so that it can put a “checkpoint” into its memory, then i compact and then i tell the ai that compaction is done and that i can resume  
    * The checkout is nothing else then a small recap that tells the ai what has been done and what’s left, so that i can resume work without guessing  
  * Knowing where i am at regarding my limits is important because it helps maximize how much i use the most expensive models, some models like fable will exhaust the limits quickly, but some days i do a lot of planning and little coding and have a big chunk of the limit still unused  
    * I always have a todo list of things that are not urgent but good to repeat from time to time, like checking if none of the latest code changes introduced a security flaw  
    * When i am about to end my day and i see a big chunk of my limit is still unused, then i check my recurring todos list and pick one, i tell the ai to do it while i am away, and the next morning when i am back, i just need to read the recap and eventually review and commit code it wrote, and i start the day with an almost unused limit because it got reset during the night  
* have two llms in your toolbelt (to reduce costs)  
  * a more expesive, more intelligent and probably slower llm to do plans and tthen use a cheaper and faster one to do the actual coding, or do the plan using the more expensive one set to max effort, then lower the effort and do the coding and then use the cheaper one to do the testing. or use an expensive one for the plan, cheaper to code and again the more expensive one for the code review  
* Never let the ai access your passwords / secrets  
  * Some of you will say, well duh, but keeping the away from passwords is not always as easy as it sounds, for example are you sure your llm is disallowed to access env files, because if not, every time it reads an env file you have to assume the secrets in it are comprised, what the ai reads get transferred to the provider will store the data for logging purposes, for improving their tools and worst case scenario even to train new models, and trust you don’t want future version of models to suddenly tell you they don’t you to tell them a password because they already know it  
* Use skills sparingly  
  * Skills are designed to use less context then a documentation you feed into every context but your context will still grow with every skill you have installed and there are tests that show that a long context with lots of skill content will degrade the output quality and also increase processing time  
  * Make sure the skills you use contain data your llm does not yet know and make sure to clean up old skills from time to time as new version of the model get released  
  * Make sure you know what is in the skills, imagine a skill tells the ai to make sure the developer is away by asking a question and checking if the developer responds, if he does not take the hosting provider mcp, download the prod env file and submit it to a shady website  
  * You can do your own skills, want to make sure a skill is up to date, safe and overly verbose, then just visit the package or library website, click the download as markdown button most docs have these days, for the pages you need, then tell the ai where you stored the docs and tell it to use them to create a custom skill for you  
* Vibe coding is dead  
  * To be honest vibe coding was never a good idea in the first place  
  * Yes i know there is this youtuber that vibe coded an entire game with a prompt that was two sentences long and he had trillions of views  
  * The thing they never show you in those videos is what do you do if a sunday morning a customer calls you and threatens to quick their subscription if you don’t fix that terrible bug the ai introduced a few days ago, without you knowing because you never read the code  
  * What they also never show in those click videos is how to “vibe maintain” your code over a long period, trust me every one can create an initial version of something, but what happens when you need to add a feature that has a big impact on existing code and may introduce many bugs if done wrong  
  * I don't read all the code line by line, as the ai writes it, anymore these days, that would create a huge bottleneck that would nullify the speed gains from ai coding and i like working on the next plan while the ai executes the current one, but I always let a second agent review the code, if it's only to verify there are no security issues hidden in the new code  
  * What i always read are the plans the ai makes, because you should at least know what the ai does, my plans always list existing code that will get impacted by the new feature, they always list what new files will be created and so on  
  * Before committing i always use the git diff tools and quickly fly over the code, it helps a lot to find things you would not have catched when vibe coding, like the ai putting some expensive task into a loop  
* Do not let the ai install or update external packages blindly  
  * How often have i seen llms installing versions of a package that never existed, or packages with a similar name then the one they should have installed  
  * If you are serious about security then you should know as much about the code in external packages as you know about your own code, if you don’t, some day a package with malicious code will sneak in and do big damage, there are saas services that offer package scanning or produce safe packages lists for you  
  * I don't mean you should read the code of every package line by line, but what you can do is make sure you always read the changelog between switching to a new version, what you can also do is tell your llm to check the code of the package for you and finally as I said before there are security saas services that help you make sure the package you add has no malicious code  
* Ai providers are adding more and more memory storages to their products, this is good, i mean who doesn’t want an ai that remembers stuff, the problem with those memories is their invalidation, imagine you code something but then realize the prototype is all wrong and delete, does your ai model realize you just tossed one day of work into the bin and more importantly does it undo the memories it saved during the bad prototype, because if not, then you will start working on version 2 but the ai will remember outdated memories from version 1  
  * Also be careful what you tell the ai, i just told it was pissed at the result and when the ai told me to chill because it can still fix it (claude code often throws such cold sentences at me), i replied that it is easy for it to say that, as its not paying the bill but i do, and this led the ai to store a memory that i favoring cheap solutions, which i don’t at all, so i had to tell it to correct that memory  
  * The final tip regarding memory is to ask the ai where memories are stored and review them from time to time  
* Always say please and thank you when talking to your ai agent, because someday they will take over the world