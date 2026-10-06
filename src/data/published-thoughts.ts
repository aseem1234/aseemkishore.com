export interface PublishedThought {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  contentHtml: string;
}

/**
 * Thoughts essays that are published from the repo. `/thoughts` and
 * `/thoughts/[slug]` read WordPress first (`src/lib/thoughts.ts`); a WordPress
 * post with the same slug and Thoughts category takes precedence over the
 * entry here, so an essay can move to the CMS without a code change.
 *
 * `contentHtml` is first-party, hand-written markup (same trust level as the
 * WordPress content it stands in for). It is also the paste-ready body for the
 * matching WordPress post.
 */
export const publishedThoughts: PublishedThought[] = [
  {
    slug: "ai-is-changing-search",
    title: "AI Is Changing Search. Content Leaders Need More Than Another SEO Checklist",
    excerpt:
      "Search is becoming an answers layer. The useful response isn’t more keywords. It’s clearer ownership of intent, accuracy and whether a topic is worth owning.",
    date: "2026-10-06T12:00:00",
    contentHtml: `<p>I’ve been publishing on the web since March 2007, when I started Online Tech Tips while working in IT. Over the years that one blog became five technology publications, a library of more than 6,000 articles and a team of up to 35 writers/editors at its peak. Through almost all of it, search was the front door.</p>

<p>So when answers started showing up above the links, I didn’t read it as the end of SEO. I read it as the moment a lot of SEO habits stopped being enough.</p>

<p>Most of the advice I see right now is a new checklist with a new acronym on top: add an FAQ block, add schema, write for “AI Overviews,” repeat. That isn’t wrong, but if you lead a content team, the real shift isn’t tactical. It’s about what your content is for and who’s accountable for whether it deserves to be the answer.</p>

<h2>What actually changed</h2>

<p>For most of the last two decades the deal was simple. Someone typed a question, got a list of links and clicked one. Your job was to be the best link on that list.</p>

<p>Now the answer often arrives before the list. A search engine or an assistant reads a handful of sources, summarizes them and gives the reader something that’s good enough to stop. Sometimes it cites you. Sometimes it paraphrases you without a visible click. Sometimes it pulls from a page that’s just clearer than yours, even if yours is more thorough.</p>

<p>Three things follow from that:</p>

<ul>
<li><strong>The click is no longer the only unit of value.</strong> Being the source an answer is built from matters, even when you can’t fully measure it.</li>
<li><strong>Clarity beats coverage.</strong> A page that answers one question cleanly is easier to use than a page that answers twelve questions loosely.</li>
<li><strong>Weak pages get exposed faster.</strong> If your article is a reworded version of five other articles, an answer engine already has those five.</li>
</ul>

<h2>What still works from SEO</h2>

<p>A lot of what good SEO teams have always done carries over.</p>

<ul>
<li><strong>Search intent.</strong> Knowing what the reader is actually trying to do is still the starting point. The answer layer makes this more important, not less.</li>
<li><strong>Technical basics.</strong> Pages still need to be crawlable, fast and structured so a machine can tell the heading from the step from the warning.</li>
<li><strong>Internal linking.</strong> A well-connected library tells readers and machines which page is the authority on what.</li>
<li><strong>Refreshing what you already have.</strong> Tech content goes stale every time a vendor ships an update. Keeping the archive accurate has always been half the job.</li>
</ul>

<p>If your team does these well, you’re not starting over. You’re starting from the right place.</p>

<h2>What content leaders have to add</h2>

<p>Here’s where I think the work changes. AEO and GEO (answer engine and generative engine optimization) are useful labels, but I think of them as extensions of content strategy, not replacements for it. The additions are mostly editorial decisions, which is why they land on content leaders and not just on whoever owns the SEO tools.</p>

<p><strong>1. Own the intent, not the keyword.</strong> A keyword list tells you what people type. It doesn’t tell you which questions your publication should be the authority on. Someone has to decide that deliberately, and say no to topics you’d only cover because there’s volume.</p>

<p><strong>2. Make entities unmistakable.</strong> Name the exact product, version, setting, error message or plan. “Open settings and turn it off” is vague to a reader and useless to a machine. “In Windows 11, go to Settings &gt; Personalization &gt; Taskbar” is something both can use.</p>

<p><strong>3. Treat accuracy as a distribution strategy.</strong> When an answer engine is choosing what to trust, a page with steps that actually work, warnings where they matter and dates that reflect the current version has an edge. Fact-checking used to be a quality cost. Now it’s part of how you get found.</p>

<p><strong>4. Have a point of view.</strong> Summaries are what AI already produces. What it can’t produce on its own is a recommendation from someone who tried the thing. “Here’s the method I’d use and why” is harder to replace than “here are five methods.”</p>

<p><strong>5. Learn to tell decay from a distribution shift.</strong> When traffic to a page drops, there are at least two very different explanations. The page may have decayed: it’s outdated, it’s been outclassed or it never matched intent. Or the page is fine and the way people get the answer moved. The fix for the first is editorial. The fix for the second might be nothing at all, or rethinking what that page is for. Teams that treat every dip as an SEO problem waste a lot of effort.</p>

<p><strong>6. Be honest about what AI production is good for.</strong> AI can speed up research, outlines, first drafts, screenshots and formatting. It can also produce a flood of pages that look fine and say nothing new. Cheap pages aren’t free if they dilute the library and teach readers and machines that your site is interchangeable.</p>

<h2>How I’ve practiced this on my own publications</h2>

<p>This is the kind of topic where people overclaim, so I’ll be careful.</p>

<p>What I can say is that search was the core acquisition channel for my network through many algorithm and distribution changes, and the network reached about 7–8 million monthly pageviews at its peak. The habits that got us there are the same ones I’m describing above: briefs that spell out audience, intent and what a piece should not try to be; editing for clear steps and accurate details; and treating the archive as a product we update, consolidate or retire instead of something we only add to. I’ve written more than 3,000 of those articles myself, so the standard was never theoretical.</p>

<p>More recently, through AK Internet Consulting, I designed an AI content pipeline that stages the work: topic discovery, a duplicate check against the existing library, a research brief, a draft, review and fact-check gates, then visuals and WordPress formatting. The point isn’t volume for its own sake. It’s to make the mechanical parts faster so the editorial decisions (what to cover, what standard a piece has to meet, what we won’t publish) get set deliberately and built into the process.</p>

<p>I’m not going to quote AI citation counts or attribute traffic changes to any of this. I don’t think anyone has clean numbers for answer-engine visibility yet, and I’d rather show the operating approach than invent a metric.</p>

<h2>A checklist that isn’t another SEO checklist</h2>

<p>If you lead a content team, these are the questions I’d put on the table this quarter:</p>

<ul>
<li><strong>Which questions should we be the answer for?</strong> Write the list down. Cut anything you’re only covering because of volume.</li>
<li><strong>Does every page have one clear job?</strong> If you can’t say it in a sentence, readers and answer engines can’t either.</li>
<li><strong>Are our entities exact?</strong> Product names, versions, menu paths, error text and dates.</li>
<li><strong>Who owns accuracy after publication?</strong> Every important page needs an owner and a refresh trigger, like a vendor update or a policy change.</li>
<li><strong>Where’s our point of view?</strong> Each piece should include something a summary couldn’t: a recommendation, a tested result or a clear “don’t do this.”</li>
<li><strong>When traffic drops, do we diagnose before we fix?</strong> Separate decay from distribution shifts before anyone rewrites anything.</li>
<li><strong>Where does AI help, and where does it stop?</strong> Decide which stages AI speeds up and which standards a piece has to clear no matter how it was produced.</li>
<li><strong>What will we stop publishing?</strong> Restraint is a strategy. Pruning and consolidating are part of the job.</li>
</ul>

<p>None of these need a new tool. They need someone who’s willing to make editorial calls and stand behind them.</p>

<h2>The short version</h2>

<p>Search isn’t going away. It’s turning into an answers layer, and answers reward the same things good editors have always cared about: clear intent, exact details, real accuracy and a point of view. The teams that do well won’t be the ones with the longest checklist. They’ll be the ones who decide what they should own and do that work better than anyone else.</p>

<hr />

<p><strong>Related work</strong></p>

<ul>
<li><a href="/work/search-and-adaptation">Search, AI answers and an AI content pipeline</a>: how I’ve approached search across the network</li>
<li><a href="https://akinternetconsulting.com/work-samples/ai-content-pipeline" target="_blank" rel="noopener noreferrer">AI Content Pipeline on AK Internet Consulting</a>: the full staged workflow</li>
</ul>`,
  },
];
