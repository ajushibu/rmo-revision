# RMO Revision on a Kindle (KOReader)

Bare-bones recall cards: question, show answer, Shaky or Got it, with a session timer (a pause over 2 minutes counts as 2) and today's total in the menu. The timer stays on the Kindle; it is not added to the app's revise time. No animations, no tools or cases (they need a screen that moves).
Ratings sync with the app over Wi-Fi and use the same spacing as the app (1, 3, 7, 14, 28 days).

## Install (USB)
1. Plug the Kindle into your computer.
2. Copy the whole folder `rmorevision.koplugin` into `koreader/plugins/` on the Kindle.
3. Eject, open KOReader, restart it (menu, Exit, then reopen).
4. In KOReader: top menu, tools (the gear/spanner tab), RMO Revision.

## Link it to the app (once)
1. In the app: Settings, Kindle, "Make a Kindle code". It shows a code like `K7QD-4M2X-9PTH` once.
2. On the Kindle: RMO Revision, "Link to the app", type the code, Link. Wi-Fi must be on.
3. It syncs straight away and shows how many cards are due.

The code lets the Kindle read your card schedule and add ratings. It cannot see notes, highlights or your account. "Unlink all Kindles" in the app cancels every code.

## Every day
- RMO Revision, "Revise: N due, M new". Tap Show answer, then Shaky or Got it. Stop any time.
- Ratings are saved on the Kindle straight away and sent when Wi-Fi is on (at the end of a session if Wi-Fi is already on, otherwise "Sync now").
- Cards the app thinks are due only appear for topics you have started in the app (Revise since...). Sync first.
- New or edited cards: "Update cards" (needs Wi-Fi) downloads the latest list. Cards you add yourself in the app (your own subtopics) are not on the Kindle.

## Notes
- Keep the Kindle clock right: ratings are time-stamped, and the newest rating wins if you rate the same card in the app and on the Kindle.
- "Check HTTPS certificates" is on by default. If the Kindle has no certificate file, sync still works but says the certificates were not checked.
- Not tested on a real Kindle by the author: the scheduling and the sync were tested against a mock of KOReader. If a screen or button misbehaves, the message on screen says what failed.
