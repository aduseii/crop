import type { Tweet } from "@/lib/tweet/types";
import { VerifiedBadge, XLogo } from "@/components/icons";

export function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <article className="mx-auto max-w-[540px] rounded-2xl bg-white p-4 text-black shadow-sm">
      <header className="flex items-start gap-3">
        <img src={tweet.author.avatar} alt="" className="h-12 w-12 rounded-full" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="truncate font-bold">{tweet.author.name}</span>
            {tweet.author.verified && <VerifiedBadge kind={tweet.author.verified} />}
          </div>
          <div className="truncate text-sm text-neutral-500">@{tweet.author.handle}</div>
        </div>
        <XLogo className="h-5 w-5 text-black" />
      </header>
      <p className="mt-3 whitespace-pre-wrap text-[15px] leading-snug">{tweet.text}</p>
      {tweet.media?.length ? (
        <div className="mt-3 overflow-hidden rounded-2xl border">
          {tweet.media.map((m, i) =>
            m.type === "photo" ? (
              <img key={i} src={m.url} alt="" className="w-full object-cover" />
            ) : null
          )}
        </div>
      ) : null}
      <footer className="mt-3 flex gap-6 text-sm text-neutral-500">
        <span>{tweet.replies} replies</span>
        <span>{tweet.reposts} reposts</span>
        <span>{tweet.likes} likes</span>
      </footer>
    </article>
  );
}
