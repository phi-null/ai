import autobind from 'autobind-decorator';
import Module from '../../module';
import Message from '../../message';

const exec = require('child_process').exec;

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
			if (msg.user.host == null && msg.user.isAdmin) {
        exec('sudo sh /home/misskey/update.sh' , (err , stdout, stderr) =>{
          if(err){console.log(err);}
          console.log(stdout);
        })
				return {
					reaction: msg.friend.love >= 0 ? 'like' : null
				};
			} else {
				return {
					reaction: msg.friend.love >= 0 ? 'hmm' : null
				};
			}
		} else {
			return false;
		}
	}
}
