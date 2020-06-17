import autobind from 'autobind-decorator';
import Module from '../../module';
import Message from '../../message';

export default class extends Module {
	public readonly name = 'update';

	@autobind
	public install() {
		return {
			mentionHook: this.mentionHook
		};
	}

	@autobind
	private async mentionHook(msg: Message) {
		if (msg.text && msg.includes(['アプデ', 'アップデート', 'update']) && msg.includes(['みすきー', 'ミスキー', 'misskey'])) {
			if (msg.user.host == 'misskey.void.gift' && msg.user.isAdmin) {
				return {
					reaction: msg.friend.love >= 0 ? 'like' : null ,
          reply('アップデート実行します！');
				};
			} else {
				return {
					reaction: msg.friend.love >= 0 ? 'hmm' : null ,
          reply('あなたにはこのコマンドの発行権限がありません！');
				};
			}
		} else {
			return false;
		}
	}
}
