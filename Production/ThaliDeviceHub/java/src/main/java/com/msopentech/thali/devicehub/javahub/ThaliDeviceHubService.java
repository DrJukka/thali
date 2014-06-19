/*
Copyright (c) Microsoft Open Technologies, Inc.
All Rights Reserved
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the
License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED,
INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache 2 License for the specific language governing permissions and limitations under the License.
*/

package com.msopentech.thali.devicehub.javahub;

import com.couchbase.lite.JavaContext;
import com.msopentech.thali.CouchDBListener.ThaliListener;

import java.io.File;

public class ThaliDeviceHubService {
    protected ThaliListener thaliListener = null;

    public void startService() {
        thaliListener = new ThaliListener();

        // TODO: We will replace with the proxy with a non-null object once we have deployment under control
        thaliListener.startServer(new ContextInUserHomeDirectory(), ThaliListener.DefaultThaliDeviceHubPort, null);
    }

    public void stopService() {
        if (thaliListener != null) {
            thaliListener.stopServer();
        }
    }
}
