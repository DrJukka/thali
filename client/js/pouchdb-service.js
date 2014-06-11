'use strict';

(function () {

    var PouchDB = require('pouchdb');
    var pouchClient = new PouchDB('contacts');

    pouchClient.allDocs({}, function(err, response) {
        console.log("Pouch retrieved:");
        console.log(response);
        if (response.total_rows == 0) {
            populateDB();
        }
    });
    
    var populateDB = function() {
        console.log("Populating contact database...");
        var contacts = [
            {"id": 1, "name": "Rob Clark",     "uniqueId": "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAgEAskOn5f/aRwWG8y+rcqhWLw5z7MBa3XRunle7PAYIfsMdnMjM71aBX+U7KEXR2PYhIrG5DKLvcB6X9tZy9AmEGS1+vLmKA7ldrmGHUVJNT0noesLSSXDe3vDe2fGxkpvYzbnptXhJsDzGa3A1nWfz9eBM8fqXNPWCgOcasmnTZFLvUydP95PGh2dtnT69aY6njdvSFCz7UJlGTmiEC8662R9x+lXVEvu0TZ5PpN6U3KgAF1p3AVPn2QAyWz0/oXoSWznpwf9N0DhMqqyChnDvgYzRsmO+YXyKuQ0mLAWGrZEu1g7+Z893LoD8tBZXr7FXAKQ1l80OuaTsMV7kvK2+jeNLRcddwPHLx1FGphwgH7M1ZkESyy1oq8qgzZ4/SHZeJC//SH+HIEFWus+cigH3xXKFrpa/iNv4j32eWl7qOvr1pb4m3wiE7dCIcLBT5QyBsvcbk085LfeavaE0VAvLp001GhFq6ABxGneDcSfXK6mTckNbfS9/xzU1sYu1NaZ8h+PcvasDB8Kr1epSApnIHlh1t4HyiEXYzvhffMTMh3UTiGZKcqYXNb06p1W7V6uhO5TtKTFulF7jKt1/4NTh/aGUGz8hq2ZOOz82RZsK4rTuEM7H42Hg2vyNs47STHCJGqNoV/jWbml2sb52fySDkkbt937SKke0JzvJMZGtp0E= rsa-key-20140610"},
            {"id": 2, "name": "Stefan Gordon", "uniqueId": "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAgEAo2DqNlTEPjKqQfVLMmIc119ejThHXEC+wTIWD/SjNcFFXkXB66Y+KHYTVyl1dJjaPiZWu6cX2y197VVQN1CDqbXqFMsKIwhqgx94NSX3+bZVQVHYuPEF4ONZgX5+/1lLREjHoGs+/otgReCfwoQTGXlGwW24YLAVlBPTJilLROit2SF8xjr+3vp+65/xajjzylAGxscrNXSHW16S/uq4+ruTt2xRBsWKuRm4MVjXzxjS3Iui3UMPkdXwp8BQ7b6sytAbqWpPC3Iph56DE7dbBZ2I/XmvC4EfPwyJZ5KkD4iuT9MCW7Ox6w+z40myUze0EAHPVxJ+t44+ro7O+ir+xdPxbOYHoSSOVp1JZ1rgF27V2LSb2APx03oeRGkngQW6QQbQEn3cXSzn4wrJZMSMU4Aey6hFHb9+CV+Qw/7heuV2cvYA7hBgj+SSNJifCPKi+CJVSmwN9iH83FWgmDYjv6AK/n4o8GMJ+jSePfopdvcpwsl8/jpMCIaqnuG7BZ9NsSPdtpcAjPo05W2wFUQthpHIpgvRk4vL8whkx6StH9t/LDfoQ1C76R7Eo24DT9QVbUt5XVDhGb9u7moWExDKJa+Z/BswIMeNmyOE3becLle8qtmKnOLJCOGtAPVdV3YbCqYKJLWb/IEtx1fS4Xh4xLwt//DrM1iV/SqQLLrKrpM= rsa-key-20140610"},
            {"id": 3, "name": "Yaron Goland",  "uniqueId": "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAgBF6XlEuNtOdyrwtdkRNWgffuSLoyQfae06wto5rThYANq/nbkN98ItsjWQ1yiSuSxMDfPO5LaocknBkR1nyzSveTHBZ7hXt1ZJ/AvmKv+iRtHorc8LlT9aXoGoJfLrF1+aWz5ynlfM4X8LYH19exkzy4BcPoDeBT8Jt/6CbAmV8sV7+X77lPXHQp9UU38bg+xpfHL4fFemVD4SRGtKH0np+v8pf76TNOqUgU8whtY2DCuFQgfa1KRgr0Mq5zsij911mTCONnIgc22jXobROIg5gKOczzzbpPznvjH277BH156AN5tv4piAYQgDNWMwhOjoM+eksslGPaOO7QbctRmyzEInOARJer18qNJAl4oVafg2RmHaVPjE6lnkFOh+U23V84dzQdJy9ueBtss3ksBdEbfip6MVQm2btESgihDLPSiCUmLogiHGIumXCLDmusVcPHquXH6iUFE7bhnZQtAtGygKMh74x5CCxZd0hKf+qFA6XkBJH5t7PrJ7iNmjSRePWnKVwNcsBZDmtnN72u7/pwApbBuBnFe4gzJ5PMu3H2hG33ePQFLIvmr35QB2eKvByF5iwQGOWDPa2RsOKiPcfhJvqHJWku2789+h3+EeDTrs1b+ImieE1wO9whaGB/kDf72g3U7+peb3jpXYs9wQxMhzR5Z4l1aTkhZQQsL03Q== rsa-key-20140610"},
            {"id": 4, "name": "Ivan Judson",   "uniqueId": "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAgEAskOn5f/aRwWG8y+rcqhWLw5z7MBa3XRunle7PAYIfsMdnMjM71aBX+U7KEXR2PYhIrG5DKLvcB6X9tZy9AmEGS1+vLmKA7ldrmGHUVJNT0noesLSSXDe3vDe2fGxkpvYzbnptXhJsDzGa3A1nWfz9eBM8fqXNPWCgOcasmnTZFLvUydP95PGh2dtnT69aY6njdvSFCz7UJlGTmiEC8662R9x+lXVEvu0TZ5PpN6U3KgAF1p3AVPn2QAyWz0/oXoSWznpwf9N0DhMqqyChnDvgYzRsmO+YXyKuQ0mLAWGrZEu1g7+Z893LoD8tBZXr7FXAKQ1l80OuaTsMV7kvK2+jeNLRcddwPHLx1FGphwgH7M1ZkESyy1oq8qgzZ4/SHZeJC//SH+HIEFWus+cigH3xXKFrpa/iNv4j32eWl7qOvr1pb4m3wiE7dCIcLBT5QyBsvcbk085LfeavaE0VAvLp001GhFq6ABxGneDcSfXK6mTckNbfS9/xzU1sYu1NaZ8h+PcvasDB8Kr1epSApnIHlh1t4HyiEXYzvhffMTMh3UTiGZKcqYXNb06p1W7V6uhO5TtKTFulF7jKt1/4NTh/aGUGz8hq2ZOOz82RZsK4rTuEM7H42Hg2vyNs47STHCJGqNoV/jWbml2sb52fySDkkbt937SKke0JzvJMZGtp0E= rsa-key-20140610"},
            {"id": 5, "name": "Josh Hughes",   "uniqueId": "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAgEAo2DqNlTEPjKqQfVLMmIc119ejThHXEC+wTIWD/SjNcFFXkXB66Y+KHYTVyl1dJjaPiZWu6cX2y197VVQN1CDqbXqFMsKIwhqgx94NSX3+bZVQVHYuPEF4ONZgX5+/1lLREjHoGs+/otgReCfwoQTGXlGwW24YLAVlBPTJilLROit2SF8xjr+3vp+65/xajjzylAGxscrNXSHW16S/uq4+ruTt2xRBsWKuRm4MVjXzxjS3Iui3UMPkdXwp8BQ7b6sytAbqWpPC3Iph56DE7dbBZ2I/XmvC4EfPwyJZ5KkD4iuT9MCW7Ox6w+z40myUze0EAHPVxJ+t44+ro7O+ir+xdPxbOYHoSSOVp1JZ1rgF27V2LSb2APx03oeRGkngQW6QQbQEn3cXSzn4wrJZMSMU4Aey6hFHb9+CV+Qw/7heuV2cvYA7hBgj+SSNJifCPKi+CJVSmwN9iH83FWgmDYjv6AK/n4o8GMJ+jSePfopdvcpwsl8/jpMCIaqnuG7BZ9NsSPdtpcAjPo05W2wFUQthpHIpgvRk4vL8whkx6StH9t/LDfoQ1C76R7Eo24DT9QVbUt5XVDhGb9u7moWExDKJa+Z/BswIMeNmyOE3becLle8qtmKnOLJCOGtAPVdV3YbCqYKJLWb/IEtx1fS4Xh4xLwt//DrM1iV/SqQLLrKrpM= rsa-key-20140610"},
            {"id": 7, "name": "Barry Briggs",  "uniqueId": "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAgBF6XlEuNtOdyrwtdkRNWgffuSLoyQfae06wto5rThYANq/nbkN98ItsjWQ1yiSuSxMDfPO5LaocknBkR1nyzSveTHBZ7hXt1ZJ/AvmKv+iRtHorc8LlT9aXoGoJfLrF1+aWz5ynlfM4X8LYH19exkzy4BcPoDeBT8Jt/6CbAmV8sV7+X77lPXHQp9UU38bg+xpfHL4fFemVD4SRGtKH0np+v8pf76TNOqUgU8whtY2DCuFQgfa1KRgr0Mq5zsij911mTCONnIgc22jXobROIg5gKOczzzbpPznvjH277BH156AN5tv4piAYQgDNWMwhOjoM+eksslGPaOO7QbctRmyzEInOARJer18qNJAl4oVafg2RmHaVPjE6lnkFOh+U23V84dzQdJy9ueBtss3ksBdEbfip6MVQm2btESgihDLPSiCUmLogiHGIumXCLDmusVcPHquXH6iUFE7bhnZQtAtGygKMh74x5CCxZd0hKf+qFA6XkBJH5t7PrJ7iNmjSRePWnKVwNcsBZDmtnN72u7/pwApbBuBnFe4gzJ5PMu3H2hG33ePQFLIvmr35QB2eKvByF5iwQGOWDPa2RsOKiPcfhJvqHJWku2789+h3+EeDTrs1b+ImieE1wO9whaGB/kDf72g3U7+peb3jpXYs9wQxMhzR5Z4l1aTkhZQQsL03Q== rsa-key-20140610"},
            {"id": 8, "name": "Tim Park",      "uniqueId": "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAgEAskOn5f/aRwWG8y+rcqhWLw5z7MBa3XRunle7PAYIfsMdnMjM71aBX+U7KEXR2PYhIrG5DKLvcB6X9tZy9AmEGS1+vLmKA7ldrmGHUVJNT0noesLSSXDe3vDe2fGxkpvYzbnptXhJsDzGa3A1nWfz9eBM8fqXNPWCgOcasmnTZFLvUydP95PGh2dtnT69aY6njdvSFCz7UJlGTmiEC8662R9x+lXVEvu0TZ5PpN6U3KgAF1p3AVPn2QAyWz0/oXoSWznpwf9N0DhMqqyChnDvgYzRsmO+YXyKuQ0mLAWGrZEu1g7+Z893LoD8tBZXr7FXAKQ1l80OuaTsMV7kvK2+jeNLRcddwPHLx1FGphwgH7M1ZkESyy1oq8qgzZ4/SHZeJC//SH+HIEFWus+cigH3xXKFrpa/iNv4j32eWl7qOvr1pb4m3wiE7dCIcLBT5QyBsvcbk085LfeavaE0VAvLp001GhFq6ABxGneDcSfXK6mTckNbfS9/xzU1sYu1NaZ8h+PcvasDB8Kr1epSApnIHlh1t4HyiEXYzvhffMTMh3UTiGZKcqYXNb06p1W7V6uhO5TtKTFulF7jKt1/4NTh/aGUGz8hq2ZOOz82RZsK4rTuEM7H42Hg2vyNs47STHCJGqNoV/jWbml2sb52fySDkkbt937SKke0JzvJMZGtp0E= rsa-key-20140610"},
            {"id": 9, "name": "Jon Udell",     "uniqueId": "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAgEAo2DqNlTEPjKqQfVLMmIc119ejThHXEC+wTIWD/SjNcFFXkXB66Y+KHYTVyl1dJjaPiZWu6cX2y197VVQN1CDqbXqFMsKIwhqgx94NSX3+bZVQVHYuPEF4ONZgX5+/1lLREjHoGs+/otgReCfwoQTGXlGwW24YLAVlBPTJilLROit2SF8xjr+3vp+65/xajjzylAGxscrNXSHW16S/uq4+ruTt2xRBsWKuRm4MVjXzxjS3Iui3UMPkdXwp8BQ7b6sytAbqWpPC3Iph56DE7dbBZ2I/XmvC4EfPwyJZ5KkD4iuT9MCW7Ox6w+z40myUze0EAHPVxJ+t44+ro7O+ir+xdPxbOYHoSSOVp1JZ1rgF27V2LSb2APx03oeRGkngQW6QQbQEn3cXSzn4wrJZMSMU4Aey6hFHb9+CV+Qw/7heuV2cvYA7hBgj+SSNJifCPKi+CJVSmwN9iH83FWgmDYjv6AK/n4o8GMJ+jSePfopdvcpwsl8/jpMCIaqnuG7BZ9NsSPdtpcAjPo05W2wFUQthpHIpgvRk4vL8whkx6StH9t/LDfoQ1C76R7Eo24DT9QVbUt5XVDhGb9u7moWExDKJa+Z/BswIMeNmyOE3becLle8qtmKnOLJCOGtAPVdV3YbCqYKJLWb/IEtx1fS4Xh4xLwt//DrM1iV/SqQLLrKrpM= rsa-key-20140610"}
        ];
     
        pouchClient.bulkDocs(contacts, function(err, response) {
            console.log("Created test users in pouch.");
        });      
    };

    var contacts = [
        {"id": 1, "name": "Rob Clark",     "uniqueId": "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAgEAskOn5f/aRwWG8y+rcqhWLw5z7MBa3XRunle7PAYIfsMdnMjM71aBX+U7KEXR2PYhIrG5DKLvcB6X9tZy9AmEGS1+vLmKA7ldrmGHUVJNT0noesLSSXDe3vDe2fGxkpvYzbnptXhJsDzGa3A1nWfz9eBM8fqXNPWCgOcasmnTZFLvUydP95PGh2dtnT69aY6njdvSFCz7UJlGTmiEC8662R9x+lXVEvu0TZ5PpN6U3KgAF1p3AVPn2QAyWz0/oXoSWznpwf9N0DhMqqyChnDvgYzRsmO+YXyKuQ0mLAWGrZEu1g7+Z893LoD8tBZXr7FXAKQ1l80OuaTsMV7kvK2+jeNLRcddwPHLx1FGphwgH7M1ZkESyy1oq8qgzZ4/SHZeJC//SH+HIEFWus+cigH3xXKFrpa/iNv4j32eWl7qOvr1pb4m3wiE7dCIcLBT5QyBsvcbk085LfeavaE0VAvLp001GhFq6ABxGneDcSfXK6mTckNbfS9/xzU1sYu1NaZ8h+PcvasDB8Kr1epSApnIHlh1t4HyiEXYzvhffMTMh3UTiGZKcqYXNb06p1W7V6uhO5TtKTFulF7jKt1/4NTh/aGUGz8hq2ZOOz82RZsK4rTuEM7H42Hg2vyNs47STHCJGqNoV/jWbml2sb52fySDkkbt937SKke0JzvJMZGtp0E= rsa-key-20140610"},
        {"id": 2, "name": "Stefan Gordon", "uniqueId": "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAgEAo2DqNlTEPjKqQfVLMmIc119ejThHXEC+wTIWD/SjNcFFXkXB66Y+KHYTVyl1dJjaPiZWu6cX2y197VVQN1CDqbXqFMsKIwhqgx94NSX3+bZVQVHYuPEF4ONZgX5+/1lLREjHoGs+/otgReCfwoQTGXlGwW24YLAVlBPTJilLROit2SF8xjr+3vp+65/xajjzylAGxscrNXSHW16S/uq4+ruTt2xRBsWKuRm4MVjXzxjS3Iui3UMPkdXwp8BQ7b6sytAbqWpPC3Iph56DE7dbBZ2I/XmvC4EfPwyJZ5KkD4iuT9MCW7Ox6w+z40myUze0EAHPVxJ+t44+ro7O+ir+xdPxbOYHoSSOVp1JZ1rgF27V2LSb2APx03oeRGkngQW6QQbQEn3cXSzn4wrJZMSMU4Aey6hFHb9+CV+Qw/7heuV2cvYA7hBgj+SSNJifCPKi+CJVSmwN9iH83FWgmDYjv6AK/n4o8GMJ+jSePfopdvcpwsl8/jpMCIaqnuG7BZ9NsSPdtpcAjPo05W2wFUQthpHIpgvRk4vL8whkx6StH9t/LDfoQ1C76R7Eo24DT9QVbUt5XVDhGb9u7moWExDKJa+Z/BswIMeNmyOE3becLle8qtmKnOLJCOGtAPVdV3YbCqYKJLWb/IEtx1fS4Xh4xLwt//DrM1iV/SqQLLrKrpM= rsa-key-20140610"},
        {"id": 3, "name": "Yaron Goland",  "uniqueId": "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAgBF6XlEuNtOdyrwtdkRNWgffuSLoyQfae06wto5rThYANq/nbkN98ItsjWQ1yiSuSxMDfPO5LaocknBkR1nyzSveTHBZ7hXt1ZJ/AvmKv+iRtHorc8LlT9aXoGoJfLrF1+aWz5ynlfM4X8LYH19exkzy4BcPoDeBT8Jt/6CbAmV8sV7+X77lPXHQp9UU38bg+xpfHL4fFemVD4SRGtKH0np+v8pf76TNOqUgU8whtY2DCuFQgfa1KRgr0Mq5zsij911mTCONnIgc22jXobROIg5gKOczzzbpPznvjH277BH156AN5tv4piAYQgDNWMwhOjoM+eksslGPaOO7QbctRmyzEInOARJer18qNJAl4oVafg2RmHaVPjE6lnkFOh+U23V84dzQdJy9ueBtss3ksBdEbfip6MVQm2btESgihDLPSiCUmLogiHGIumXCLDmusVcPHquXH6iUFE7bhnZQtAtGygKMh74x5CCxZd0hKf+qFA6XkBJH5t7PrJ7iNmjSRePWnKVwNcsBZDmtnN72u7/pwApbBuBnFe4gzJ5PMu3H2hG33ePQFLIvmr35QB2eKvByF5iwQGOWDPa2RsOKiPcfhJvqHJWku2789+h3+EeDTrs1b+ImieE1wO9whaGB/kDf72g3U7+peb3jpXYs9wQxMhzR5Z4l1aTkhZQQsL03Q== rsa-key-20140610"},
        {"id": 4, "name": "Ivan Judson",   "uniqueId": "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAgEAskOn5f/aRwWG8y+rcqhWLw5z7MBa3XRunle7PAYIfsMdnMjM71aBX+U7KEXR2PYhIrG5DKLvcB6X9tZy9AmEGS1+vLmKA7ldrmGHUVJNT0noesLSSXDe3vDe2fGxkpvYzbnptXhJsDzGa3A1nWfz9eBM8fqXNPWCgOcasmnTZFLvUydP95PGh2dtnT69aY6njdvSFCz7UJlGTmiEC8662R9x+lXVEvu0TZ5PpN6U3KgAF1p3AVPn2QAyWz0/oXoSWznpwf9N0DhMqqyChnDvgYzRsmO+YXyKuQ0mLAWGrZEu1g7+Z893LoD8tBZXr7FXAKQ1l80OuaTsMV7kvK2+jeNLRcddwPHLx1FGphwgH7M1ZkESyy1oq8qgzZ4/SHZeJC//SH+HIEFWus+cigH3xXKFrpa/iNv4j32eWl7qOvr1pb4m3wiE7dCIcLBT5QyBsvcbk085LfeavaE0VAvLp001GhFq6ABxGneDcSfXK6mTckNbfS9/xzU1sYu1NaZ8h+PcvasDB8Kr1epSApnIHlh1t4HyiEXYzvhffMTMh3UTiGZKcqYXNb06p1W7V6uhO5TtKTFulF7jKt1/4NTh/aGUGz8hq2ZOOz82RZsK4rTuEM7H42Hg2vyNs47STHCJGqNoV/jWbml2sb52fySDkkbt937SKke0JzvJMZGtp0E= rsa-key-20140610"},
        {"id": 5, "name": "Josh Hughes",   "uniqueId": "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAgEAo2DqNlTEPjKqQfVLMmIc119ejThHXEC+wTIWD/SjNcFFXkXB66Y+KHYTVyl1dJjaPiZWu6cX2y197VVQN1CDqbXqFMsKIwhqgx94NSX3+bZVQVHYuPEF4ONZgX5+/1lLREjHoGs+/otgReCfwoQTGXlGwW24YLAVlBPTJilLROit2SF8xjr+3vp+65/xajjzylAGxscrNXSHW16S/uq4+ruTt2xRBsWKuRm4MVjXzxjS3Iui3UMPkdXwp8BQ7b6sytAbqWpPC3Iph56DE7dbBZ2I/XmvC4EfPwyJZ5KkD4iuT9MCW7Ox6w+z40myUze0EAHPVxJ+t44+ro7O+ir+xdPxbOYHoSSOVp1JZ1rgF27V2LSb2APx03oeRGkngQW6QQbQEn3cXSzn4wrJZMSMU4Aey6hFHb9+CV+Qw/7heuV2cvYA7hBgj+SSNJifCPKi+CJVSmwN9iH83FWgmDYjv6AK/n4o8GMJ+jSePfopdvcpwsl8/jpMCIaqnuG7BZ9NsSPdtpcAjPo05W2wFUQthpHIpgvRk4vL8whkx6StH9t/LDfoQ1C76R7Eo24DT9QVbUt5XVDhGb9u7moWExDKJa+Z/BswIMeNmyOE3becLle8qtmKnOLJCOGtAPVdV3YbCqYKJLWb/IEtx1fS4Xh4xLwt//DrM1iV/SqQLLrKrpM= rsa-key-20140610"},
        {"id": 7, "name": "Barry Briggs",  "uniqueId": "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAgBF6XlEuNtOdyrwtdkRNWgffuSLoyQfae06wto5rThYANq/nbkN98ItsjWQ1yiSuSxMDfPO5LaocknBkR1nyzSveTHBZ7hXt1ZJ/AvmKv+iRtHorc8LlT9aXoGoJfLrF1+aWz5ynlfM4X8LYH19exkzy4BcPoDeBT8Jt/6CbAmV8sV7+X77lPXHQp9UU38bg+xpfHL4fFemVD4SRGtKH0np+v8pf76TNOqUgU8whtY2DCuFQgfa1KRgr0Mq5zsij911mTCONnIgc22jXobROIg5gKOczzzbpPznvjH277BH156AN5tv4piAYQgDNWMwhOjoM+eksslGPaOO7QbctRmyzEInOARJer18qNJAl4oVafg2RmHaVPjE6lnkFOh+U23V84dzQdJy9ueBtss3ksBdEbfip6MVQm2btESgihDLPSiCUmLogiHGIumXCLDmusVcPHquXH6iUFE7bhnZQtAtGygKMh74x5CCxZd0hKf+qFA6XkBJH5t7PrJ7iNmjSRePWnKVwNcsBZDmtnN72u7/pwApbBuBnFe4gzJ5PMu3H2hG33ePQFLIvmr35QB2eKvByF5iwQGOWDPa2RsOKiPcfhJvqHJWku2789+h3+EeDTrs1b+ImieE1wO9whaGB/kDf72g3U7+peb3jpXYs9wQxMhzR5Z4l1aTkhZQQsL03Q== rsa-key-20140610"},
        {"id": 8, "name": "Tim Park",      "uniqueId": "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAgEAskOn5f/aRwWG8y+rcqhWLw5z7MBa3XRunle7PAYIfsMdnMjM71aBX+U7KEXR2PYhIrG5DKLvcB6X9tZy9AmEGS1+vLmKA7ldrmGHUVJNT0noesLSSXDe3vDe2fGxkpvYzbnptXhJsDzGa3A1nWfz9eBM8fqXNPWCgOcasmnTZFLvUydP95PGh2dtnT69aY6njdvSFCz7UJlGTmiEC8662R9x+lXVEvu0TZ5PpN6U3KgAF1p3AVPn2QAyWz0/oXoSWznpwf9N0DhMqqyChnDvgYzRsmO+YXyKuQ0mLAWGrZEu1g7+Z893LoD8tBZXr7FXAKQ1l80OuaTsMV7kvK2+jeNLRcddwPHLx1FGphwgH7M1ZkESyy1oq8qgzZ4/SHZeJC//SH+HIEFWus+cigH3xXKFrpa/iNv4j32eWl7qOvr1pb4m3wiE7dCIcLBT5QyBsvcbk085LfeavaE0VAvLp001GhFq6ABxGneDcSfXK6mTckNbfS9/xzU1sYu1NaZ8h+PcvasDB8Kr1epSApnIHlh1t4HyiEXYzvhffMTMh3UTiGZKcqYXNb06p1W7V6uhO5TtKTFulF7jKt1/4NTh/aGUGz8hq2ZOOz82RZsK4rTuEM7H42Hg2vyNs47STHCJGqNoV/jWbml2sb52fySDkkbt937SKke0JzvJMZGtp0E= rsa-key-20140610"},
        {"id": 9, "name": "Jon Udell",     "uniqueId": "ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAgEAo2DqNlTEPjKqQfVLMmIc119ejThHXEC+wTIWD/SjNcFFXkXB66Y+KHYTVyl1dJjaPiZWu6cX2y197VVQN1CDqbXqFMsKIwhqgx94NSX3+bZVQVHYuPEF4ONZgX5+/1lLREjHoGs+/otgReCfwoQTGXlGwW24YLAVlBPTJilLROit2SF8xjr+3vp+65/xajjzylAGxscrNXSHW16S/uq4+ruTt2xRBsWKuRm4MVjXzxjS3Iui3UMPkdXwp8BQ7b6sytAbqWpPC3Iph56DE7dbBZ2I/XmvC4EfPwyJZ5KkD4iuT9MCW7Ox6w+z40myUze0EAHPVxJ+t44+ro7O+ir+xdPxbOYHoSSOVp1JZ1rgF27V2LSb2APx03oeRGkngQW6QQbQEn3cXSzn4wrJZMSMU4Aey6hFHb9+CV+Qw/7heuV2cvYA7hBgj+SSNJifCPKi+CJVSmwN9iH83FWgmDYjv6AK/n4o8GMJ+jSePfopdvcpwsl8/jpMCIaqnuG7BZ9NsSPdtpcAjPo05W2wFUQthpHIpgvRk4vL8whkx6StH9t/LDfoQ1C76R7Eo24DT9QVbUt5XVDhGb9u7moWExDKJa+Z/BswIMeNmyOE3becLle8qtmKnOLJCOGtAPVdV3YbCqYKJLWb/IEtx1fS4Xh4xLwt//DrM1iV/SqQLLrKrpM= rsa-key-20140610"}
    ],

    findById = function (id) {
        var contact = null,
            l = contacts.length,
            i;
        for (i = 0; i < l; i = i + 1) {
            if (contacts[i].id === id) {
                contact = contacts[i];
                break;
            }
        }
        return contact;
    };


    angular.module('myApp.memoryServices', [])
        .factory('Contact', [
            function () {
                return {
                    query: function () {
                        return contacts;
                    },
                    get: function (contact) {
                        return findById(parseInt(contact.id));
                    }
                }

            }]);

}());